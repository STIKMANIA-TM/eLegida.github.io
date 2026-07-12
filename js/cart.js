function getCart() {
  return JSON.parse(localStorage.getItem('elegida_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('elegida_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product, size, color, qty = 1) {
  try {
    rateLimiter.checkLimit('ADD_CART', 20, 60000);
    const cart = getCart();
    const existing = cart.find(i => i.id === product.id && i.size === size && i.color === color);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, image: product.images[0], size, color, qty });
    }
    saveCart(cart);
    showNotification('Añadido al carrito', 'success');
  } catch (err) {
    showNotification(err.message, 'error');
  }
}

function updateCartQty(index, qty) {
  const cart = getCart();
  if (qty <= 0) cart.splice(index, 1);
  else cart[index].qty = qty;
  saveCart(cart);
}

function clearCart() { saveCart([]); }

function updateCartBadge() {
  const count = getCart().reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = count > 0 ? count : '';
}