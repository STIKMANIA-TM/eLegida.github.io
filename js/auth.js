async function loginWithOTP(email) {
  try {
    rateLimiter.checkLimit('LOGIN', 5, 60000); // 5 intentos por minuto
    const { error } = await db.auth.signInWithOtp({ email });
    if (error) throw error;
    showNotification('Código enviado a tu correo', 'success');
  } catch (err) {
    showNotification(err.message, 'error');
  }
}

async function verifyOTP(email, token) {
  try {
    const { error } = await db.auth.verifyOtp({ email, token, type: 'email' });
    if (error) throw error;
    showNotification('Sesión iniciada', 'success');
    setTimeout(() => window.location.href = 'admin.html', 1000);
  } catch (err) {
    showNotification(err.message, 'error');
  }
}

async function logout() {
  await db.auth.signOut();
  window.location.href = 'index.html';
}

async function getUser() {
  const { data: { user } } = await db.auth.getUser();
  return user;
}