/**
 * WhatsApp Business Configuration
 * Update these values with your actual business details
 */

export const WHATSAPP_CONFIG = {
  // Business phone number in format: +COUNTRYCODE[AREACODE]NUMBER
  // Example: +919876543210 (India)
  businessNumber: "+916380080915",

  // Business name
  businessName: "Raelyn Cakes",

  // Default message header
  messageHeader: "Hi! I'm interested in ordering:",
};

/**
 * Generate WhatsApp message for cake order
 */
export const generateWhatsAppMessage = (
  cakeName: string,
  weight: number,
  category: string,
): string => {
  return `${WHATSAPP_CONFIG.messageHeader}

🎂 *${cakeName}*
Weight: ${weight}kg
Category: ${category}`
};

/**
 * Open WhatsApp chat with pre-filled message
 */
export const openWhatsAppChat = (message: string): void => {
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = WHATSAPP_CONFIG.businessNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

/**
 * Open WhatsApp with simplified message (for share button)
 */
export const shareOnWhatsApp = (text: string): void => {
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/?text=${encodedText}`;
  window.open(whatsappUrl, "_blank");
};
