
// identica os elementos que estão no HTML
const adicionarTarefa = document.getElementById('adicionarTarefa')
const adicionarTarefaButton = document.getElementById('adicionarTarefaButton')
const listaTarefa = document.getElementById('listaTarefa')

let contConcluido = document.getElementById('contConcluidas')
let contPendente = document.getElementById('contPendentes')

//verifica se os valores dos contadores são negativo, nulo ou NaN, se for, é atribuido 0 para a variavel
if  ((Number.isNaN(contConcluido.value)) || (contConcluido.value == null) ||(contConcluido.value < 0) ){
    contConcluido.value = 0
}

if ((Number.isNaN(contPendente.value)) || (contPendente.value == null) || (contPendente.value < 0)  ){
    contPendente.value = 0
}

let valorConcluido = contConcluido.value
let valorPendente = contPendente.value
console.log(contConcluido.value)

// recupera os dados armazenadas no navegador por meio do localstorange
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
    const li = document.createElement("li") //cria a tag li mas ainda não está visivel na interface
    if (completed)li.classList.add("completed") //verifica se existe "completed", se sim, adiciona a classe "completed" a tag li
        
    //cria a lista com a tarefa e o botão de deletar
    li.innerHTML = `
        <span>${text}</span> 
        <button class="deletarTarefa">X</button>
    `
   
    listaTarefa.appendChild(li)  //insere a tarefa na lista e deixa visivel na interface

}
// adiciona novas tarefas 
const addTarefa = () => {
    const text = adicionarTarefa.value.trim() //tirar espaços vazios
    if(!text) return //caso texto vazio, vai retornar

    criarElementoTarefa(text) //caso não esteja vazio, cria tarefa

    //incrementa o contador de tarefas pendentes
    valorPendente++
    contPendente.value = valorPendente

    salvarTarefa()  //chama a função salvarTarefa() para que as tarefas sejam salvas no navegador por meio do local storange

    adicionarTarefa.value = "" //limpa a campo de inserir o nome da tarefa para poder ser adicionada outra
}

adicionarTarefaButton.addEventListener("click", addTarefa) //ao clicar no botão "adicionar", uma nova tarefa é adicionada a lista

adicionarTarefa.addEventListener("keypress", (e) => e.key === "Enter" && addTarefa()) //ao clicar na tecla "enter", uma nova tarefa é adicionada a lista

//verifica se a ação de click é para apagar uma tarefa ou coloca-la como completa
listaTarefa.addEventListener("click", (e) => {

    const li = e.target.closest("li")
    if(!li) return

    if (e.target.tagName === "SPAN") {
        if((li.classList.toggle("completed")==true)){
            valorConcluido++
            contConcluido.value = valorConcluido
            console.log(valorConcluido)
            console.log(contConcluido.value)
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
            console.log(contConcluido.value)
            
        }
        else{
            valorPendente--
            contPendente.value = valorPendente
            
        }
    }

    salvarTarefa()
})



carregarTarefa()
