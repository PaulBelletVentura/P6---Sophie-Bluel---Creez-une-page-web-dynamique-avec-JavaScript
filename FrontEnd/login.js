// Récupération des éléments du formulaire de connexion
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Gérer la soumission du formulaire de connexion
loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Empêcher le comportement par défaut du formulaire

  // Récupérer les valeurs saisies dans le formulaire
  const email = emailInput.value;
  const password = passwordInput.value;

  // Envoyer la demande d'authentification à l'API
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => {
    // Vérifier si la demande d'authentification a réussi
    if (!response.ok) {
      throw new Error('Erreur de connexion');
    }
    return response.json();
  })
  .then(data => {
    // Récupérer le token de la réponse de l'API
    const token = data.token;

    // Stocker le token localement sur le navigateur
    localStorage.setItem('token', token);

    // Rediriger l'utilisateur vers la page d'accueil
    window.location.href = 'index.html';


     console.log(data);

    // Vérifier de la connexion, si bien effectuée - Modifier avant le rendu final
    console.log("Hello!");
    console.log(token);
    alert("Welcome !");

  })


  .catch(error => {
    console.error(error);
    alert('Impossible de se connecter');

  });
});
