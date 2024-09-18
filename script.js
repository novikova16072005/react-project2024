let cart = [];
let total = 0;

const cartItems = document.getElementById('cart-items');
const totalElement = document.getElementById('total');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const productName = button.parentElement.querySelector('h3').textContent;
        const productPrice = parseFloat(button.parentElement.querySelector('p').textContent.slice(1));

        cart.push({ name: productName, price: productPrice });
        total += productPrice;
        updateCart();
    });
});

function updateCart() {
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });
    totalElement.textContent = total.toFixed(2);
}

document.getElementById('confirm-order').addEventListener('click', () => {
    alert('Order confirmed!');
    cart = [];
    total = 0;
    updateCart();
});
