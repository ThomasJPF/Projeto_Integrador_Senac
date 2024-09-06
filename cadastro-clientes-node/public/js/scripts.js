document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Coleta os dados do formulário
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Envia os dados para o servidor via fetch
    fetch('/api/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Cadastro realizado com sucesso!');
        } else {
            alert('Erro ao realizar o cadastro.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
