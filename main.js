/* ======================================================
   Aura Essence Perfumes - main.js
   Handles: Cart, Order ID generation, Form submission
   ====================================================== */

// ----------------------------
// CART SYSTEM
// ----------------------------
let cart = JSON.parse(localStorage.getItem('auraCart')) || [];

function addToCart(productName, price) {
  const item = { name: productName, price: price };
  cart.push(item);
  localStorage.setItem('auraCart', JSON.stringify(cart));
  alert(productName + " added to cart!");
}

// ----------------------------
// ORDER SUMMARY (Payments Page)
// ----------------------------
function loadOrderSummary() {
  const summaryBox = document.getElementById('orderSummary');

  if (!summaryBox) return;

  let total = 0;
  summaryBox.innerHTML = '';

  if (cart.length === 0) {
    summaryBox.innerHTML = '<p>No items in cart.</p>';
    return;
  }

  cart.forEach(item => {
    const row = document.createElement('p');
    row.textContent = `${item.name} - ₹${item.price}`;
    summaryBox.appendChild(row);
    total += item.price;
  });

  const totalRow = document.createElement('h3');
  totalRow.textContent = `Total: ₹${total}`;
  summaryBox.appendChild(totalRow);
}

// ----------------------------
// ORDER ID GENERATION
// ----------------------------
function generateOrderId() {
  return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
}

// ----------------------------
// PAYMENT FORM SUBMIT HANDLER
// ----------------------------
function submitPayment(event) {
  event.preventDefault();

  const orderId = generateOrderId();

  // Clear cart after order
  localStorage.removeItem('auraCart');

  // Redirect to Thank You page
  window.location.href = `thankyou.html?orderId=${orderId}`;
}

// ----------------------------
// THANK YOU PAGE: SHOW ORDER ID
// ----------------------------
function loadOrderId() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('orderId');
  const target = document.getElementById('orderIdBox');

  if (id && target) {
    target.textContent = id;
  }
}

// Auto-run functions on page load
window.onload = function() {
  loadOrderSummary();
  loadOrderId();
};
