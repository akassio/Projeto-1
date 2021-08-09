//seletores
const inserir = document.querySelector(".inserir");
const botaoAdd = document.querySelector(".botao-add");
const lista = document.querySelector(".lista-todos");
const opcoes = document.querySelector(".filtro");

//eventos

document.addEventListener("DOMContentLoaded", registros);
botaoAdd.addEventListener("click", adicionar);
lista.addEventListener("click", deletarRegistros);
opcoes.addEventListener("click", filtrarRegistros);

//funcoes

function adicionar(evento){
    evento.preventDefault();
    const todoDiv= document.createElement("div");
    todoDiv.classList.add("todo");
    //criar lista
    const novaTarefa = document.createElement("li");
    novaTarefa.innerText = inserir.value;
    //salvar no localStorage
    salvarLocal(inserir.value);
    
    //Add item
    novaTarefa.classList.add("todo-item");
    todoDiv.appendChild(novaTarefa);

    //regitro inserido check!
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check-double"></i>';
    completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);

    //registro apagado check!
    const apagarBtn = document.createElement("button");
    apagarBtn.innerHTML = '<i class="fas fa-minus-circle"></i>';
    apagarBtn.classList.add("trash-btn");
    todoDiv.appendChild(apagarBtn);
    
    //linkar registro-filho
    lista.appendChild(todoDiv);
    
    inserir.value = "";
}

function deletarRegistros(evento){
    const item = evento.target;
    //Deletar registro
    if(item.classList[0] === "trash-btn"){
        const registro = item.parentElement;
        registro.classList.add("fall");
        retiraStorage(registro);
        registro.addEventListener("transitionend", function(){
            registro.remove();
        });
    }

    //check de concluido 
    if(item.classList[0] === "completed-btn"){
        const registro = item.parentElement;
        registro.classList.toggle("completed");
    }
}

function filtrarRegistros(evento){
    const todos = lista.childNodes;
    todos.forEach(function(todo) {
        switch(evento.target.value){
            case "tudo":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "pendente":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function salvarLocal(todo){
    //ve se ja tem registro
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}

function registros() {
    //ve se ja tem registro
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(registro) {
    //cria div pra todo
    const todoDiv= document.createElement("div");
    todoDiv.classList.add("todo");
    //Cria lista
    const novaTarefa = document.createElement("li");
    novaTarefa.innerText = registro;
    novaTarefa.classList.add("todo-item");
    todoDiv.appendChild(novaTarefa);
    inserir.value = "";
    //cria botão de concluido
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check-double"></i>';
    completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);
    //cria botao da lixeira
    const apagarBtn = document.createElement("button");
    apagarBtn.innerHTML = '<i class="fas fa-minus-circle"></i>';
    apagarBtn.classList.add("trash-btn");
    todoDiv.appendChild(apagarBtn);
    
    lista.appendChild(todoDiv);
  });
}
    

function retiraStorage(todo){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //remove a posição do elemento que está sendo clicado
    const todoIndex = todo.children[0].innerText;//pra pegar o index de 1 elemento especifico e remove ele
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
