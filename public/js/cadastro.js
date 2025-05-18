document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form') || document.querySelector('.fix-cadastro');
    const loadingOverlay = document.getElementById('loading-overlay');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (loadingOverlay) loadingOverlay.style.display = 'flex';

        const name = document.getElementById('nome').value;
        const age = parseInt(document.getElementById('idade').value);
        const species = document.getElementById('especie').value;
        const photo_url = document.getElementById('image').value;
        const description = document.getElementById('descricao').value;
        const user_id = localStorage.getItem('userId');

        try {
            const response = await fetch('https://univesp-pi-1-api.onrender.com/animals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id,
                    name,
                    age,
                    species,
                    photo_url,
                    description,
                    adopted: false
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Animal cadastrado com sucesso!');
                //window.location.href = 'meus-pets.html';
            } else {
                console.error('Erro na resposta da API:', data);
                alert('Erro ao cadastrar animal. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao tentar cadastrar:', error);
            alert('Erro de conexão com o servidor.');
        } finally {
            if (loadingOverlay) loadingOverlay.style.display = 'none';
        }
    });
});
