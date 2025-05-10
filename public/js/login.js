document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // evita recarregar a página

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
        alert('Login realizado com sucesso!');
        console.log('Resposta da API:', data);
        // Redirecionar ou salvar token
        // localStorage.setItem('token', data.token);
        // window.location.href = 'dashboard.html';
      } else {
        alert(data.message || 'Falha no login.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro de conexão com o servidor.');
    }
  });
});
