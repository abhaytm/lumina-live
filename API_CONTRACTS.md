# Lumina Live - Production API Specification (v1)

**Base URL:** `https://api.luminalive.com/v1`  
**Protocol:** HTTPS  
**Format:** JSON  

---

## 1. API Overview & Auth Strategy

### 1.1 Authentication
*   **Method:** JWT (JSON Web Token)
*   **Header:** `Authorization: Bearer <access_token>`
*   **Refresh Strategy:** Standard `accessToken` (15m expiry) + `refreshToken` (7d expiry).

### 1.2 Global Response Envelope
```json
{
  "status": "success",
  "data": {},
  "meta": { "timestamp": "2023-10-27T10:00:00Z" }
}
```

---

## 2. Auth APIs

### 2.1 Request OTP
*   **URL:** `POST /auth/otp/request`
*   **Auth:** No
*   **Body:** `{ "phone": "+1234567890" }`
*   **Response:** `{ "message": "OTP sent successfully", "session_id": "uuid" }`

### 2.2 Verify OTP & Login
*   **URL:** `POST /auth/otp/verify`
*   **Auth:** No
*   **Body:** `{ "session_id": "uuid", "code": "123456" }`
*   **Response:** 
    ```json
    {
      "user": { "id": "u1", "name": "Alex", "role": "user" },
      "tokens": { "access": "jwt...", "refresh": "jwt..." }
    }
    ```

---

## 3. Product & Catalog APIs

### 3.1 List Products
*   **URL:** `GET /products`
*   **Params:** `category_id`, `search`, `limit`, `offset`
*   **Response:** 
    ```json
    {
      "items": [{ "id": "p1", "name": "Serum", "price": 45.0, "image_url": "..." }],
      "total": 120
    }
    ```

### 3.2 Product Detail
*   **URL:** `GET /products/{id}`
*   **Response:** Full product object including `stock_count` and `description`.

---

## 4. Live Stream APIs

### 4.1 List Live Streams
*   **URL:** `GET /streams`
*   **Params:** `status` (live/upcoming/ended)
*   **Response:** List of stream objects with `viewer_count` and `creator` info.

### 4.2 Join Stream
*   **URL:** `POST /streams/{id}/join`
*   **Auth:** Yes
*   **Purpose:** Increments viewer count, registers participation.
*   **Response:** `{ "stream_url": "https://ivs...", "chat_token": "..." }`

---

## 5. Cart & Order APIs

### 5.1 Add to Cart
*   **URL:** `POST /cart`
*   **Body:** `{ "product_id": "p1", "quantity": 1 }`
*   **Response:** Updated cart total and item list.

### 5.2 Create Order (Checkout)
*   **URL:** `POST /orders`
*   **Auth:** Yes
*   **Body:** `{ "address_id": "a1", "payment_method": "card" }`
*   **Response:** `{ "order_id": "ord_123", "payment_url": "https://stripe..." }`

---

## 6. Creator Studio APIs

### 6.1 Create Stream
*   **URL:** `POST /creator/streams`
*   **Auth:** Yes (Role: Creator)
*   **Body:** `{ "title": "Summer Sale", "product_ids": ["p1", "p2"] }`
*   **Response:** 
    ```json
    {
      "id": "s1",
      "ingest_endpoint": "rtmps://...",
      "stream_key": "sk_..."
    }
    ```

### 6.2 Stream Analytics (Live)
*   **URL:** `GET /creator/analytics/streams/{id}`
*   **Response:** 
    ```json
    {
      "peak_viewers": 1200,
      "current_viewers": 850,
      "total_sales": 4500.0,
      "conversion_rate": 0.05
    }
    ```

---

## 7. Analytics APIs

### 7.1 Track Event
*   **URL:** `POST /analytics/events`
*   **Body:** 
    ```json
    {
      "event_type": "product_click",
      "properties": { "product_id": "p1", "stream_id": "s1" }
    }
    ```

---

## 8. Error Handling Standards

All errors return the appropriate HTTP status code and a standardized body.

| Status | Code | Description |
| :--- | :--- | :--- |
| 400 | `BAD_REQUEST` | Missing parameters or invalid format. |
| 401 | `UNAUTHORIZED` | Token expired or invalid. |
| 403 | `FORBIDDEN` | User role insufficient (e.g. non-creator accessing studio). |
| 409 | `OUT_OF_STOCK` | Product stock reached 0 during checkout. |
| 500 | `INTERNAL_ERROR` | Server-side failure. |

**Error Format:**
```json
{
  "status": "error",
  "error": {
    "code": "OUT_OF_STOCK",
    "message": "The Lumina Serum is no longer available.",
    "details": { "product_id": "p1" }
  }
}
```

---

## 9. Versioning & Deprecation

*   **Versioning:** Versioned via URL path (`/v1`).
*   **Backwards Compatibility:** No breaking changes allowed in v1. Minor additive changes only.
*   **Deprecation:** Deprecated endpoints return a `Warning` header.
