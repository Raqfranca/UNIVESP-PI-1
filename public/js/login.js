document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
      //event.preventDefault(); // Evita recarregar a página
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      fakeLogin(email, password)
        .then(response => {
          alert(response.message);
          //window.location.href = "../index.html"; // Redireciona para a página inicial
        })
        .catch(error => {
          alert(error.message);
        });
    });
  });
  