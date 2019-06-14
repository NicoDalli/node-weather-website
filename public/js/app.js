
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#mess')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#message').textContent = 'Cargando resultados'
    if(search.value) {
        fetch('http://localhost:3000/weather?address='+ search.value).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    document.querySelector('#message').textContent = data.error                    
                } else {
                    document.querySelector('#message').textContent = data.fdata
                }
            })
        })
    }
})