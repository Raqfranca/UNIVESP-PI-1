document.addEventListener("DOMContentLoaded", function () {
  let path = window.location.pathname.includes("/pages/") 
    ? "../components/navbar.html" 
    : "./components/navbar.html";

  fetch(path)
    .then(response => response.text())
    .then(html => {
      document.getElementById("navbar-container").innerHTML = html;

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (!isLoggedIn) {
        const restrictedLinks = document.querySelectorAll(".logged-only");
        restrictedLinks.forEach(item => {
          item.style.display = "none";
        });
      }
    })
    .catch(error => console.error("Erro ao carregar a navbar:", error));
});

