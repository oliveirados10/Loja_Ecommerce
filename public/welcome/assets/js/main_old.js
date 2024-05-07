const inputAddImcEl = document.querySelector('.add-imc input')
const buttonAddImcEl = document.querySelector('.add-imc button')
const imcListEl = document.querySelector('.imclist')
const noImcsEl = document.querySelector('.no-imc')
 
buttonAddImcEl.addEventListener('click', () => {
    const value = inputAddImcEl.value
    createImc(value)
})

function deleteImc(id) {
    fetch('http://localhost:3333/api/imc/' + id, { method: 'DELETE' })
        .then(() => {
            getAllImcs()
        })
}

function createImc(value) {
    fetch('http://localhost:3333/api/imc/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: value, value: false })
    })
        .then(() => {
            getAllImcs()
        })
}
 
function updateImc(id, name, value) {
    fetch('http://localhost:3333/api/imc/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, value: value })
    })
        .then(() => {
            getAllImcs()
        })
}
 
function mountImc(imc) {
    const imcEl = document.createElement('label')
    const deleteButtonEl = document.createElement('button')
    const checkboxEl = document.createElement('input')
    const nameEl = document.createElement('p')
 
    imcEl.className = 'imc'
    deleteButtonEl.innerHTML = 'deletar'
    deleteButtonEl.addEventListener('click', () => {
        deleteImc(imc.id)
    })
    checkboxEl.type = 'checkbox'
    checkboxEl.name = 'imc-' + imc.id
    checkboxEl.value = imc.value
    checkboxEl.addEventListener('change', () => {
        updateImc(imc.id, imc.name, checkboxEl.value)
    })
    nameEl.innerHTML = value.name
 
    valueEl.appendChild(checkboxEl)
    valueEl.appendChild(nameEl)
    valueEl.appendChild(deleteButtonEl)
    valueListEl.appendChild(imcEl)
}
 
function getAllImcs() {
    fetch('http://localhost:3333/api/imc/')
        .then((response) => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                imcListEl.innerHTML = '<p class="no-imcs active">Nenhuma tarefa cadastrada.</p>'
            } else {
                imcListEl.innerHTML = ''
                data.forEach(mountImc)
            }
        })
}
 
 
getAllImcs()