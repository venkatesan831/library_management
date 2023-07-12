// Get the book items and cart elements
const bookItems = document.querySelectorAll('#bookList li');
const cartItems = document.getElementById('cartItems');

// Add event listeners to the "Add to Cart" buttons
bookItems.forEach(item => {
  const addToCartBtn = item.querySelector('.addToCart');
  const availabilityCount = item.querySelector('.availabilityCount');
  const bookTitle = item.querySelector('.bookTitle').textContent;

  addToCartBtn.addEventListener('click', () => {
    // Check if book is already in the cart
    const existingCartItem = cartItems.querySelector(`li[data-title="${bookTitle}"]`);

    if (existingCartItem) {
      // Book is already in the cart, increase the quantity
      const quantity = parseInt(existingCartItem.dataset.quantity);
      existingCartItem.dataset.quantity = quantity + 1;
      existingCartItem.querySelector('.cartQuantity').textContent = `Quantity: ${quantity + 1}`;
    } else {
      // Book is not in the cart, add it as a new item
      const cartItem = document.createElement('li');
      cartItem.dataset.title = bookTitle;
      cartItem.dataset.quantity = 1;
      cartItem.innerHTML = `
        <span>${bookTitle}</span>
        <span class="cartQuantity">Quantity: 1</span>
      `;
      cartItems.appendChild(cartItem);
    }

    // Decrease the availability count
    const availability = parseInt(availabilityCount.textContent);
    if (availability > 0) {
      availabilityCount.textContent = availability - 1;
    }
  });
});

// Checkout event listener
document.getElementById('checkout').addEventListener('click', () => {
  const cartItems = document.querySelectorAll('#cartItems li');
  cartItems.forEach(item => {
    const bookTitle = item.dataset.title;
    const quantity = parseInt(item.dataset.quantity);
    const availabilityCount = document.querySelector(`#bookList li .bookTitle[data-title="${bookTitle}"] + .availability .availabilityCount`);
    const availability = parseInt(availabilityCount.textContent);
    availabilityCount.textContent = availability + quantity;
  });

  // Clear the cart
  cartItems.forEach(item => item.remove());
});
