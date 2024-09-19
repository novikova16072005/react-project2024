document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        button.style.display = 'none'; 
        let quantitySelector = button.nextElementSibling;
        quantitySelector.style.display = 'flex'; 
        
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

function addToCart(productName, price) {
    let cartItems = document.querySelector('.cart-items');
    let emptyCartMessage = document.querySelector('.empty-cart-message');
    
    emptyCartMessage.style.display = 'none';
    
    let existingItem = cartItems.querySelector(`li[data-product="${productName}"]`);

    if (!existingItem) {
        let newItem = document.createElement('li');
        newItem.setAttribute('data-product', productName);
        newItem.innerHTML = `<span>${productName}</span> <span class="cart-quantity">1</span> x <span class="cart-price">$${price.toFixed(2)}</span>`;
        cartItems.appendChild(newItem);
    } else {
        let currentQuantity = parseInt(existingItem.querySelector('.cart-quantity').textContent);
        existingItem.querySelector('.cart-quantity').textContent = currentQuantity + 1;
        existingItem.querySelector('.cart-price').textContent = `$${((currentQuantity + 1) * price).toFixed(2)}`;
    }

    cartCount++; 
    updateCartCount();
    updateTotalPrice();
}

function updateCart(productName, newQuantity) {
    let cartItem = document.querySelector(`li[data-product="${productName}"]`);
    let pricePerUnit = parseFloat(cartItem.querySelector('.cart-price').textContent.slice(1)) / parseInt(cartItem.querySelector('.cart-quantity').textContent);

    cartItem.querySelector('.cart-quantity').textContent = newQuantity;
    cartItem.querySelector('.cart-price').textContent = `$${(pricePerUnit * newQuantity).toFixed(2)}`;

    updateTotalPrice();
}

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

let cartCount = 0; 

function updateCartCount() {
    document.querySelector('.cart-count').textContent = `(${cartCount})`;
}