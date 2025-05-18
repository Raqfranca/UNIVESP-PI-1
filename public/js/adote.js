document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('pets-container');
  
    try {
      const resposta = await fetch('https://univesp-pi-1-api.onrender.com/animals');
      const dados = await resposta.json();
  
      // Filtra apenas os que NÃO foram adotados
      const naoAdotados = dados.filter(animal => !animal.adopted);
  
      if (naoAdotados.length === 0) {
        container.innerHTML = '<p>Nenhum pet disponível para adoção.</p>';
        return;
      }
  
      naoAdotados.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('card');
  
        card.innerHTML = `
          <img src="${animal.photo_url}" alt="Foto de ${animal.name}">
          <div class="card-body">
            <h2>${animal.name}</h2>
            <p><strong>Espécie:</strong> ${animal.species}</p>
            <p><strong>Idade:</strong> ${animal.age}</p>
            <p><strong>Descrição:</strong> ${animal.description}</p>
          </div>
        `;
  
        container.appendChild(card);
      });
    } catch (erro) {
      console.error('Erro ao carregar pets:', erro);
      container.innerHTML = '<p>Erro ao carregar os pets.</p>';
    }
  });
  