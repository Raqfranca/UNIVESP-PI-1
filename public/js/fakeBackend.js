// Simula um banco de dados de usuários no LocalStorage
const fakeDB = {
    users: [
      { id: 1, email: "teste@email.com", password: "123456" },
      { id: 2, email: "user@email.com", password: "senha123" }
    ]
  };
  
  // Salva no LocalStorage para persistência simples
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(fakeDB.users));
  }
  
  // Simula uma requisição de login
  function fakeLogin(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users"));
        const user = users.find(u => u.email === email && u.password === password);
  
        if (user) {
          resolve({ success: true, message: "Login realizado com sucesso!" });
        } else {
          reject({ success: false, message: "Email ou senha incorretos!" });
        }
      }, 1000); // Simula um pequeno delay como um backend real
    });
  }