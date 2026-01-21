
/**
 * PRICE UTILITY FUNCTIONS
 */

// Converts rupees to paise (minor units) with rounding safety
export const rupeesToPaise = (rupees: number): number => {
  return Math.round(rupees * 100);
};

// Converts paise back to rupees for internal math if needed
export const paiseToRupees = (paise: number): number => {
  return paise / 100;
};

/**
 * FRONTEND CURRENCY FORMATTER CODE
 */

// Formats amount in paise to Indian Rupee string (en-IN locale)
// Example: 199900 -> ₹1,999.00
export const formatINR = (amountInPaise: number): string => {
  if (amountInPaise === 0) return '₹0.00';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountInPaise / 100);
};

/**
 * API RESPONSE EXAMPLE
 * 
 * {
 *   "price": {
 *     "amount": 4500,
 *     "currency": "INR"
 *   }
 * }
 */
