import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, title: "Waffle", description: "Waffle with Berries", price: 6.50, image: "/assets/assets/img/image-waffle-desktop.jpg", quantity: 0 },
    { id: 2, title: "Crème Brûlée", description: "Vanilla Bean Crème Brûlée", price: 7.00, image: "/assets/assets/img/image-creme-brulee-desktop.jpg", quantity: 0 },
    { id: 3, title: "Macaron", description: "Macaron Mix of Five", price: 8.00, image: "/assets/assets/img/image-macaron-desktop.jpg", quantity: 0 },
    { id: 4, title: "Tiramisu", description: "Classic Tiramisu", price: 5.50, image: "/assets/assets/img/image-tiramisu-desktop.jpg", quantity: 0 },
    { id: 5, title: "Baklava", description: "Pistachio Baklava", price: 4.00, image: "/assets/assets/img/image-baklava-desktop.jpg", quantity: 0 },
    { id: 6, title: "Pie", description: "Lemon Meringue Pie", price: 5.00, image: "/assets/assets/img/image-meringue-desktop.jpg", quantity: 0 },
    { id: 7, title: "Cake", description: "Red Velvet Cake", price: 4.50, image: "/assets/assets/img/image-cake-desktop.jpg", quantity: 0 },
    { id: 8, title: "Brownie", description: "Salted Caramel Brownie", price: 4.50, image: "/assets/assets/img/image-brownie-desktop.jpg", quantity: 0 },
    { id: 9, title: "Panna Cotta", description: "Vanilla Panna Cotta", price: 6.50, image: "/assets/assets/img/image-panna-cotta-desktop.jpg", quantity: 0 },
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const addToCart = (productName, price) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.title === productName ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === productName);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === productName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { name: productName, price, quantity: 1 }];
    });
  };

  const updateQuantity = (productName, change) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.title === productName 
          ? { ...product, quantity: Math.max(0, product.quantity + change) } 
          : product
      )
    );
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.name === productName
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="main-content">
      <div className="content">
        <div className="container-with-cards">
          <h1>Desserts</h1>
          <div className="products">
            {products.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
        </div>
        <Cart 
          cartItems={cartItems}
          totalPrice={totalPrice}
          updateQuantity={updateQuantity}
        />
      </div>
    </div>
  );
}

export default App;