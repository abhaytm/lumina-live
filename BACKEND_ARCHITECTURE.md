# Lumina Live - Backend Architecture & System Design

**Version:** 1.0.0  
**Target:** Production MVP to Scale  
**Lead Architect:** Startup CTO / Senior Backend Architect

---

## 1. High-Level Architecture Overview

Lumina Live uses a **Modular Monolith** architecture. This allows for rapid MVP development while maintaining strict boundaries between domains (Auth, Commerce, Streaming) so they can be easily extracted into microservices when traffic scales.

### 1.1 Tech Stack
*   **API Framework:** Node.js + NestJS (TypeScript). Justification: Native support for Microservices, WebSockets, and excellent DTO/Validation patterns.
*   **Database (Primary):** PostgreSQL (Managed via AWS RDS or Supabase). Justification: Relational integrity for orders and product inventory.
*   **Cache/Real-time:** Redis. Justification: Pub/Sub for chat, viewer counts, and session caching.
*   **Streaming Infra:** AWS Interactive Video Service (IVS) or Mux. Justification: Low-latency (sub-5s) managed streaming; offloads transcoding/CDN complexity.
*   **File Storage:** AWS S3 (Images/Video replays).
*   **Search:** Algolia or Postgres Full-Text Search (for MVP).

---

## 2. System Diagram (Text-Based)

```text
[ Clients: iOS / Android / Web ]
      │
      ▼
[ AWS CloudFront (CDN) ] ────────┐
      │                          │
      ▼                          ▼
[ API Gateway / Load Balancer ] [ AWS IVS (Video Ingest/Egress) ]
      │                          │
      ▼                          │
[ NestJS Modular API ] ──────────┤
      │                          │
      ├─► [ PostgreSQL ]         │
      ├─► [ Redis ] <────────────┘ (Viewer Counts)
      └─► [ SQS / RabbitMQ ] ────► [ Worker: Analytics & Notifications ]
```

---

## 3. Module Breakdown

### 3.1 Auth & User Service
*   **Identity:** JWT-based stateless auth.
*   **Roles:** User, Creator, Admin.
*   **MVP Shortcut:** Integrate Firebase/Supabase Auth for OTP handling and Social Login.

### 3.2 Product & Catalog Service
*   **Inventory:** Atomic updates to prevent overselling during high-traffic flash sales.
*   **State:** Products can be `Draft`, `Active`, or `Live-Only`.

### 3.3 Live Stream Service (The Core)
*   **Stream Metadata:** Stores title, status (`Scheduled`, `Live`, `Ended`), and thumbnail.
*   **Product Tagging:** Relational table `stream_products` to track which products are featured in which stream.
*   **Lifecycle:** 
    1. Creator calls `/streams/start` -> API generates IVS Ingest Endpoint.
    2. Creator broadcasts RTMP.
    3. Webhook from IVS notifies API that stream is live -> API updates Redis/Postgres.

### 3.4 Cart & Order Service
*   **Checkout:** Integration with Stripe/Adyen.
*   **Concurrency:** High-volume checkout handling during "Flash Sales" using a Redis-backed queue for order processing.

---

## 4. Real-time Communication Flow

### 4.1 Chat System (WebSockets/Socket.io)
*   Rooms are scoped by `stream_id`.
*   Messages are ephemeral (cached in Redis for 1 hour) and persisted to Postgres only if "Replay" is enabled.
*   **Rate Limiting:** Global and per-user message throttling to prevent spam during viral events.

### 4.2 Viewer Count Tracking
*   **Mechanism:** Periodic "heartbeat" from clients via WebSocket.
*   **Storage:** Redis `INCR`/`DECR` operations on `viewer_count:{stream_id}`.
*   **Optimization:** Counts are updated in Postgres every 60 seconds to reduce DB load.

---

## 5. Analytics Pipeline

### 5.1 Event Tracking
Events are pushed to a non-blocking background queue (SQS) to ensure zero impact on API response times.

*   **View Start/End:** Calculate average watch time.
*   **Product Click:** Track conversion funnel (Impression -> Click -> Add to Cart -> Buy).
*   **Heart Burst:** Sentiment tracking for creator performance.

### 5.2 Storage
*   Raw events -> S3 (Data Lake).
*   Aggregated metrics -> Postgres (Dashboard usage).

---

## 6. Security & Scaling Strategy

### 6.1 Security
*   **JWT Revocation:** Maintain a Redis blacklist for logged-out tokens.
*   **Role-Based Access Control (RBAC):** NestJS Guards ensure users cannot access `/creator/*` or `/admin/*` endpoints.
*   **CORS:** Strict whitelist of mobile/web origins.

### 6.2 Scalability
*   **Stateless API:** Deploy in Auto-scaling Group (AWS ECS/EKS).
*   **Database Read Replicas:** Scale commerce read traffic (browsing products) separately from write traffic (orders).
*   **Redis Cluster:** Partition chat/counts across nodes if concurrent viewers exceed 100k.

---

## 7. Deployment Architecture

*   **Infrastructure as Code (IaC):** Terraform scripts for environment reproducibility.
*   **CI/CD:** 
    *   `main` branch -> Production (AWS).
    *   `develop` branch -> Staging/UAT.
*   **Monitoring:**
    *   **Logging:** Winston/Pino -> ELK Stack or Datadog.
    *   **Performance:** Sentry for error tracking, Prometheus/Grafana for server health.

---

## 8. Database Schema (Simplified MVP)

```sql
TABLE Users (id, email, name, avatar, role, creator_profile_id);
TABLE Products (id, name, description, price, stock_count, creator_id);
TABLE Streams (id, creator_id, title, status, ingest_url, viewer_count, started_at);
TABLE Stream_Products (stream_id, product_id, is_featured, order_index);
TABLE Orders (id, user_id, stream_id, total_amount, status, payment_intent_id);
TABLE Chat_Messages (id, stream_id, user_id, text, created_at);
```
