
// identica os elementos que estão no HTML
const adicionarTarefa = document.getElementById('adicionarTarefa')
const adicionarTarefaButton = document.getElementById('adicionarTarefaButton')
const listaTarefa = document.getElementById('listaTarefa')
const contConcluido = document.getElementById('contConcluidas')
const contPendente = document.getElementById('contPendentes')

let valorConcluido = contConcluido.value
let valorPendente = contPendente.value

if ((contPendente.value < 0) || (Number.isNaN(contPendente.value))){
    localStorage.removeItem('contPendente')
    contPendente.value = 0
    valorPendente = contPendente.value
}

if ((contConcluido.value < 0) || (Number.isNaN(contConcluido.value))){
    localStorage.removeItem('contConcluido')
    contConcluido.value = 0
    valorConcluido = contConcluido.value
}
// recupera os dados armazenadas
carregarTarefa = () =>{
    const Tarefa = JSON.parse(localStorage.getItem('Tarefa') || '[]')
    Tarefa.forEach(({text, completed}) => criarElementoTarefa(text, completed))

    valorConcluido = localStorage.getItem('contConcluido')
    contConcluido.value = valorConcluido

    valorPendente = localStorage.getItem('contPendente')
    contPendente.value = valorPendente

}
// armazena os valores das variaveis no local storage, assim quando se atualiza a pagina as tarefas não são perdidas
const salvarTarefa = () => {
    const Tarefa = Array.from(listaTarefa.children).map((li) => ({
        text: li.querySelector("span").textContent,
        completed: li.classList.contains("completed"),
        
    }))
    
    
    localStorage.setItem("Tarefa", JSON.stringify(Tarefa))
    localStorage.setItem("contConcluido", valorConcluido)
    localStorage.setItem("contPendente", valorPendente)
    
}

// cria uma nova tarefa e coloca na lista dos usuarios
const criarElementoTarefa = (text, completed = false) => {
    const li = document.createElement("li")
    if (completed)li.classList.add("completed")
        
    li.innerHTML = `
        <span>${text}</span> 
        <button class="deletarTarefa">X</button>
    `
   
    listaTarefa.appendChild(li) 

}
// adiciona novas tarefas 
const addTarefa = () => {
    const text = adicionarTarefa.value.trim() //tirar espaços vazios
    if(!text) return //caso texto vazio, vai retornar

    criarElementoTarefa(text) //caso não esteja vazio, cria tarefa

    valorPendente++
    contPendente.value = valorPendente


    salvarTarefa()
    adicionarTarefa.value = ""
}

adicionarTarefaButton.addEventListener("click", addTarefa)

adicionarTarefa.addEventListener("keypress", (e) => e.key === "Enter" && addTarefa())

listaTarefa.addEventListener("click", (e) => {

    const li = e.target.closest("li")
    if(!li) return

    if (e.target.tagName === "SPAN") {
        if((li.classList.toggle("completed")==true)){
            valorConcluido++
            contConcluido.value = valorConcluido
            
            valorPendente--
            contPendente.value = valorPendente
    
        }
        else {
            valorPendente++
            contPendente.value = valorPendente
            
            valorConcluido--
            contConcluido.value = valorConcluido
        }
        
        
    } else if (e.target.classList.contains("deletarTarefa")) {
        li.remove()
        if(li.classList == "completed"){
            valorConcluido--
            contConcluido.value = valorConcluido
            
        }
        else{
            valorPendente--
            contPendente.value = valorPendente
            
        }
    }

    salvarTarefa()
})



carregarTarefa()
