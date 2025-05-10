document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const loadingOverlay = document.getElementById('loading-overlay');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    loadingOverlay.style.display = 'flex'; 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('https://univesp-pi-1-api.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.userId); 
        localStorage.setItem('isLoggedIn', 'true');  
        window.location.href = 'meus-pets.html';
      } else {
        alert('Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao tentar login:', error);
      alert('Erro de conexão com o servidor.');
    } finally {
      loadingOverlay.style.display = 'none'; 
    }
  });
});

