function adminLogin(e) {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      return db.collection('users').doc(uid).get();
    })
    .then((doc) => {
      if (doc.exists && doc.data().role === "admin") {
        alert("Admin login successful!");
        // You can redirect or load Admin-specific UI
      } else {
        alert("Access denied: Not an admin!");
        auth.signOut();
      }
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}
