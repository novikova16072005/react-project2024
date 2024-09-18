document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        // Зміна стану кнопки
        button.style.display = 'none'; // Ховаємо кнопку "Add to Cart"
        let quantitySelector = button.nextElementSibling; // Блок з вибором кількості
        quantitySelector.style.display = 'flex'; // Показуємо блок кількості
        
        // Додаємо продукт до корзини
        let productName = button.previousElementSibling.previousElementSibling.textContent;
        let price = parseFloat(button.previousElementSibling.dataset.price);
        addToCart(productName, price);
    });
});

document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', function() {
        let quantityDisplay = this.previousElementSibling;
        let currentQuantity = parseInt(quantityDisplay.textContent);
        quantityDisplay.textContent = currentQuantity + 1;
        
        let productName = this.closest('.product').querySelector('h3').textContent;
        updateCart(productName, currentQuantity + 1);
    });
});

document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', function() {
        let quantityDisplay = this.nextElementSibling;
        let currentQuantity = parseInt(quantityDisplay.textContent);
        if (currentQuantity > 1) {
            quantityDisplay.textContent = currentQuantity - 1;
            let productName = this.closest('.product').querySelector('h3').textContent;
            updateCart(productName, currentQuantity - 1);
        }
    });
});

// Функція для додавання продукту до корзини
function addToCart(productName, price) {
    let cartItems = document.querySelector('.cart-items');
    let emptyCartMessage = document.querySelector('.empty-cart-message');
    
    // Якщо це перший продукт, приховати повідомлення про порожню корзину
    emptyCartMessage.style.display = 'none';
    
    let existingItem = cartItems.querySelector(`li[data-product="${productName}"]`);

    if (!existingItem) {
        let newItem = document.createElement('li');
        newItem.setAttribute('data-product', productName);
        newItem.innerHTML = `<span>${productName}</span> <span class="cart-quantity">1</span> x <span class="cart-price">$${price.toFixed(2)}</span>`;
        cartItems.appendChild(newItem);
    } else {
        // Якщо продукт вже є, збільшуємо його кількість і оновлюємо ціну
        let currentQuantity = parseInt(existingItem.querySelector('.cart-quantity').textContent);
        existingItem.querySelector('.cart-quantity').textContent = currentQuantity + 1;
        existingItem.querySelector('.cart-price').textContent = `$${((currentQuantity + 1) * price).toFixed(2)}`;
    }

    cartCount++; // Збільшуємо кількість товарів у корзині
    updateCartCount();
    updateTotalPrice();
}

// Функція для оновлення кількості продукту в корзині
function updateCart(productName, newQuantity) {
    let cartItem = document.querySelector(`li[data-product="${productName}"]`);
    let pricePerUnit = parseFloat(cartItem.querySelector('.cart-price').textContent.slice(1)) / parseInt(cartItem.querySelector('.cart-quantity').textContent);

    cartItem.querySelector('.cart-quantity').textContent = newQuantity;
    cartItem.querySelector('.cart-price').textContent = `$${(pricePerUnit * newQuantity).toFixed(2)}`;

    updateTotalPrice();
}

// Функція для оновлення загальної суми
function updateTotalPrice() {
    let totalPrice = 0;
    let cartItems = document.querySelectorAll('.cart-items li');
    let emptyCartMessage = document.querySelector('.empty-cart-message');
    
    if (cartItems.length === 0) {
        emptyCartMessage.style.display = 'block'; 
    } else {
        emptyCartMessage.style.display = 'none';
    }

    cartItems.forEach(item => {
        let itemPrice = parseFloat(item.querySelector('.cart-price').textContent.slice(1));
        totalPrice += itemPrice;
    });
    
    document.querySelector('.total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

let cartCount = 0;  // Початкова кількість продуктів у корзині

function updateCartCount() {
    document.querySelector('.cart-count').textContent = `(${cartCount})`;
}

// Функція для видалення товару з корзини
function removeFromCart(productName) {
    let cartItems = document.querySelector('.cart-items');
    let itemToRemove = cartItems.querySelector(`li[data-product="${productName}"]`);
    if (itemToRemove) {
        cartItems.removeChild(itemToRemove);
        cartCount--;  // Зменшуємо кількість товарів
        updateCartCount();
        updateTotalPrice();  // Оновлюємо загальну суму корзини
    }
}
