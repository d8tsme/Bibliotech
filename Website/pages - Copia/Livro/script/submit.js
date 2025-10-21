document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    const resposta = await 
    fetch('', {
        method : 'POST',
        headers: { 'Content-Type': 'aplication/json'},
        body: JSON.stringify({usuario, senha})
    });

    const dados = await resposta.json();
    console.log(dados)
})

const fotoInput = document.getElementById('foto');
const preview = document.getElementById('preview');
fotoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) { preview.style.display = 'none'; preview.src = ''; return; }
    preview.src = URL.createObjectURL(file);
    preview.style.display = 'block';
});