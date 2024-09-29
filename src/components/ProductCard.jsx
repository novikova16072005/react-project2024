import React from 'react';

const ProductCard = ({ product, onAddToCart, onUpdateQuantity }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.description} />
      <p className="title">{product.title}</p>
      <p className="description">{product.description}</p>
      <p className="price" data-price={product.price}>${product.price.toFixed(2)}</p>
      {product.quantity === 0 ? (
        <button className="add-to-cart" onClick={() => onAddToCart(product.title, product.price)}>
          <img src="/assets/assets/img/icon-add-to-cart.svg" alt="cart icon" /> Add to Cart
        </button>
      ) : (
        <div className="quantity-selector">
          <button className="decrease" onClick={() => onUpdateQuantity(product.title, -1)}>−</button>
          <span className="quantity">{product.quantity}</span>
          <button className="increase" onClick={() => onUpdateQuantity(product.title, 1)}>+</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;