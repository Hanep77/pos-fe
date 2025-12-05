# Stock Management Features - Cashier Module

## Overview
This document describes the stock management features implemented in the Cashier module to handle out-of-stock items and prevent overselling.

## Features Implemented

### 1. Out-of-Stock Item Handling
- **Visual Indication**: Items with zero stock are displayed with:
  - Grayed-out background (`bg-gray-200`)
  - Reduced opacity (`opacity-50`)
  - "Stok Habis" (Out of Stock) label
  - Disabled cursor (`cursor-not-allowed`)
  
- **Interaction Prevention**: 
  - Out-of-stock items cannot be clicked
  - No items are added to cart when stock is 0

### 2. Cart Quantity Limitations
- **Maximum Quantity Control**: 
  - Users cannot add more items than available stock
  - "+" button becomes disabled when cart quantity reaches stock limit
  - Visual feedback with red text when at maximum quantity

- **Real-time Validation**:
  - Alert messages show when trying to exceed stock
  - Stock information displayed for each cart item

### 3. Pre-Payment Validation
- **Comprehensive Stock Check**: Before processing payment, the system validates:
  - Each cart item quantity against available stock
  - Prevents payment if any item exceeds stock
  - Clear error messages indicating which items have insufficient stock

## Technical Implementation

### Interface Updates
```typescript
interface ItemType {
  id: number;
  name: string;
  price: number;
  image_url: string;
  stock: number; // Added stock field
}
```

### Key Functions

#### addToCart()
- Validates stock before adding items
- Prevents adding items when stock is insufficient
- Shows appropriate alert messages

#### Stock Validation in Payment
```typescript
// Validate stock before processing payment
for (const cartItem of cart) {
  if (cartItem.qty > cartItem.stock) {
    alert(`Stok tidak mencukupi untuk ${cartItem.name}. Stok tersedia: ${cartItem.stock}, diminta: ${cartItem.qty}`);
    return;
  }
}
```

## User Experience

### Visual Indicators
1. **Product Grid**:
   - Normal items: White background, clickable
   - Out-of-stock items: Gray background, non-clickable
   - Stock quantity displayed under price

2. **Cart Items**:
   - Stock availability shown for each item
   - Quantity controls with disabled state when at limit
   - Red highlighting when at maximum quantity

3. **Buttons**:
   - "+" button disabled and grayed out when stock limit reached
   - Tooltips showing "Stok tidak mencukupi" for disabled buttons

### Error Messages
- "Stok habis untuk item [name]" - When trying to add out-of-stock items
- "Stok tidak mencukupi. Stok tersedia: [number]" - When trying to exceed available stock
- Pre-payment validation with detailed stock information

## Benefits
1. **Prevents Overselling**: Ensures orders don't exceed available inventory
2. **Better UX**: Clear visual feedback about stock status
3. **Data Integrity**: Maintains accurate inventory levels
4. **Error Prevention**: Multiple validation layers prevent stock-related errors

## Future Enhancements
- Real-time stock updates from server
- Stock reservation during cart session
- Low stock warnings (e.g., when stock < 5)
- Bulk stock validation API calls