import React from 'react';

const CartItem = ({ item, onRemove, onAdjustQuantity }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Quantity: 
        <input 
          type="number" 
          value={item.quantity} 
          min="1" 
          onChange={(e) => onAdjustQuantity(item.id, parseInt(e.target.value))}
        />
      </p>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
};

export default CartItem;
