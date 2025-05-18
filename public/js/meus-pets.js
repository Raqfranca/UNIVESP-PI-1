document.addEventListener('DOMContentLoaded', async () => {
  const userId = localStorage.getItem('userId');
  const tabelaBody = document.querySelector('#animal-table tbody');

  if (!userId) {
    tabelaBody.innerHTML = `<tr><td colspan="6">Usuário não identificado.</td></tr>`;
    return;
  }

  try {
    const resposta = await fetch(`https://univesp-pi-1-api.onrender.com/animals/${userId}`);
    const animais = await resposta.json();

    if (!Array.isArray(animais) || animais.length === 0) {
      tabelaBody.innerHTML = `<tr><td colspan="6">Nenhum animal encontrado.</td></tr>`;
      return;
    }

    animais.forEach(animal => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td><img src="${animal.photo_url || '#'}" alt="${animal.name || 'Sem nome'}" width="100" /></td>
        <td>${animal.name || '-'}</td>
        <td>${animal.age || '-'}</td>
        <td>${animal.species || '-'}</td>
        <td>${animal.description || '-'}</td>
        <td>
          ${animal.adopted
            ? 'Sim'
            : `<button class="btn-adotar" data-id="${animal._id}">Marcar como adotado</button>`}
        </td>
      `;
      tabelaBody.appendChild(linha);

      if (!animal.adopted) {
        const botao = linha.querySelector('.btn-adotar');
        botao.addEventListener('click', async () => {
          try {
            const resposta = await fetch(`https://univesp-pi-1-api.onrender.com/animals/${animal._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ adopted: true })
            });

            if (resposta.ok) {
              botao.parentElement.innerHTML = 'Sim';
            } else {
              alert('Erro ao marcar como adotado.');
            }
          } catch (erro) {
            console.error('Erro ao marcar como adotado:', erro);
            alert('Erro na comunicação com o servidor.');
          }
        });
      }
    });

  } catch (erro) {
    console.error('Erro ao buscar animais:', erro);
    tabelaBody.innerHTML = `<tr><td colspan="6">Erro ao carregar dados.</td></tr>`;
  }
});

