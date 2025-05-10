document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const name = document.getElementById('name').value;
  
      // Verificar se as senhas coincidem
      if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return; 
      }
  
      try {
        const response = await fetch('https://univesp-pi-1-api.onrender.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, name })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Cadastro realizado com sucesso!');
          window.location.href = 'login.html';
        } else {
          alert(data.message || 'Falha no cadastro.');
        }
      } catch (error) {
        console.error('Erro ao criar cadastro:', error);
        alert('Erro de conexão com o servidor.');
      }
    });
  });
  