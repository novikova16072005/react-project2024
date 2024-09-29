import React from 'react';

const Cart = ({ cartItems, totalPrice, updateQuantity }) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <img src="/assets/assets/img/illustration-empty-cart.svg" alt="Empty Cart" style={{ width: '200px', height: 'auto' }} />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul style={{listStyleType: 'none', paddingLeft: '0'}}>
            {cartItems.map(item => (
              <li key={item.name} className="cart-item">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">Quantity: {item.quantity}</span>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className='total-price'>Total Price: ${totalPrice.toFixed(2)}</p>
          <button className='confirm-order'>Confirm Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;