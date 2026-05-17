# WhatsApp Order Integration

## Overview

WhatsApp order buttons have been added to cake cards and cake detail pages, allowing customers to send order details directly to your WhatsApp Business number.

---

## Features

✅ **WhatsApp button on each cake card** - Quick order via WhatsApp  
✅ **Detailed WhatsApp button on cake detail page** - Order with full customization  
✅ **Pre-filled messages** - Includes cake name, weight, price, and special requests  
✅ **Centralized configuration** - Easy to update WhatsApp number  
✅ **Mobile-friendly** - Opens WhatsApp app on mobile or web version on desktop  

---

## Files Added/Modified

### New Files
- `src/utils/whatsappUtils.ts` - WhatsApp utility functions and configuration

### Modified Files
- `src/components/CakeCard.tsx` - Added WhatsApp button to cake cards
- `src/pages/CakeDetail.tsx` - Added WhatsApp button to detail page with full order info

---

## Configuration

### Update Your WhatsApp Business Number

Edit `src/utils/whatsappUtils.ts`:

```typescript
export const WHATSAPP_CONFIG = {
  businessNumber: "+919876543210", // ← Update with your number
  businessName: "Raelyn Cakes",
  messageHeader: "Hi! I'm interested in ordering:",
};
```

**Format:** `+COUNTRYCODE[AREACODE]NUMBER`
- Example for India: `+919876543210`
- Example for USA: `+12125552368`

---

## How It Works

### On Cake Card
1. User clicks the **"WhatsApp"** button
2. Message includes:
   - Cake name
   - Selected weight
   - Price
   - Category
   - Description
3. Opens WhatsApp with pre-filled message

### On Cake Detail Page
1. User fills in all details:
   - Weight
   - Quantity
   - Cake message
   - Reference image (if custom)
   - Special instructions
2. Clicks **"WhatsApp Order"** button
3. Message includes all the above details plus:
   - Quantity
   - Cake message
   - Special instructions

---

## Message Format

**Cake Card Message:**
```
Hi! I'm interested in ordering:

🎂 *Black Forest*
Weight: 1kg
Price: ₹700
Category: Classy

Rich chocolate sponge with cherries, whipped cream, and chocolate shards

Can you help me place this order?
```

**Cake Detail Message:**
```
[Same as above] +

Quantity: 2
📝 Cake Message: "Happy Birthday!"
💬 Special Instructions: "No nuts please, dairy-free if possible"
```

---

## Utility Functions

### `generateWhatsAppMessage()`
Generates a formatted message with cake details.

```typescript
const message = generateWhatsAppMessage(
  "Black Forest",
  1,
  700,
  "Classy",
  "Rich chocolate cake..."
);
```

### `openWhatsAppChat()`
Opens WhatsApp with the pre-filled message.

```typescript
const message = "Hi! I want to order...";
openWhatsAppChat(message);
```

### `shareOnWhatsApp()`
Generic WhatsApp share (opens contact picker).

```typescript
shareOnWhatsApp("Check out our cakes!");
```

---

## Browser & Device Support

| Device | Support |
|--------|---------|
| Mobile (iOS) | ✅ Opens WhatsApp app |
| Mobile (Android) | ✅ Opens WhatsApp app |
| Desktop/Web | ✅ Opens WhatsApp Web |
| Desktop (without WhatsApp installed) | ✅ Opens web.whatsapp.com |

---

## Testing

### Test on Cake Card
1. Navigate to `/cakes` page
2. Find any cake
3. Select a weight
4. Click **"WhatsApp"** button
5. Verify message appears in WhatsApp

### Test on Cake Detail
1. Navigate to any cake detail page (e.g., `/cake/cls-1`)
2. Fill in customization details:
   - Select weight
   - Add message on cake
   - Add special instructions
   - Increase quantity
3. Click **"WhatsApp Order"** button
4. Verify all details appear in WhatsApp message

---

## Customization

### Change Button Labels

**Cake Card** - Edit `src/components/CakeCard.tsx`:
```typescript
<Button ... >
  <MessageCircle className="h-4 w-4" />
  Order via WhatsApp  {/* Change this */}
</Button>
```

**Cake Detail** - Edit `src/pages/CakeDetail.tsx`:
```typescript
<Button ... >
  <MessageCircle className="mr-2 h-5 w-5" />
  Contact on WhatsApp  {/* Change this */}
</Button>
```

### Customize Message Format

Edit `src/utils/whatsappUtils.ts`:

```typescript
export const generateWhatsAppMessage = (
  cakeName: string,
  weight: number,
  price: number,
  category: string,
  description: string
): string => {
  // Customize message here
  return `Your custom message`;
};
```

---

## Analytics & Tracking

To track WhatsApp orders, add event logging:

```typescript
const handleWhatsAppOrder = (e: React.MouseEvent) => {
  // Add analytics
  console.log("WhatsApp order initiated", {
    cakeName: cake.name,
    weight: selectedWeight,
    timestamp: new Date()
  });
  
  // ... rest of code
};
```

---

## FAQs

**Q: Will users see my number?**  
A: Yes, WhatsApp will show your business number. This is intentional and helps build trust.

**Q: Do I need a WhatsApp Business account?**  
A: Not required, but recommended for better features. Regular WhatsApp works fine.

**Q: Can I track who clicks the button?**  
A: Add event tracking/analytics to `handleWhatsAppOrder()` function.

**Q: What if user doesn't have WhatsApp?**  
A: The link will:
- On mobile: Prompt to install WhatsApp
- On desktop: Open web.whatsapp.com

**Q: Can I customize the message?**  
A: Yes, edit `generateWhatsAppMessage()` in `whatsappUtils.ts`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Button doesn't open WhatsApp | Check WhatsApp number format includes + and country code |
| Message shows wrong price | Verify weight is correctly selected before clicking |
| Message content is cut off | WhatsApp has 4096 character limit - reduce detail length |
| Button not visible on mobile | Check CSS - may need `flex-shrink-0` |

---

## Next Steps

1. **Update the phone number** in `whatsappUtils.ts`
2. **Test on mobile and desktop**
3. **Customize message format** if needed
4. **Add analytics** to track conversions
5. **Train customer service team** to respond to WhatsApp orders

