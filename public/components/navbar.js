document.addEventListener("DOMContentLoaded", function () {
  let path = window.location.pathname.includes("/pages/") 
    ? "../components/navbar.html" 
    : "./components/navbar.html";

  fetch(path)
    .then(response => response.text())
    .then(html => {
      document.getElementById("navbar-container").innerHTML = html;
    })
    .catch(error => console.error("Erro ao carregar a navbar:", error));
});

