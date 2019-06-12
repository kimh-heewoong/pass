const formToDo = document.querySelector(".ps_formToDo")
const toDoinput = formToDo.querySelector("input")
const toDoList =document.querySelector(".ps_toDoList")
const TODO_LS ="todo"

function filterFn(toDo){
  return toDo.id === 1
}
let todos = [];

function saveTodos(){
  localStorage.setItem(TODO_LS , JSON.stringify(todos))
}

function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = todos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });

  todos= cleanToDos
  saveTodos();
}

function paintTodo(text){
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
        delBtn.innerText="x";
        span.innerText=text
const newId= todos.length + 1
  li.appendChild(span);
  li.appendChild(delBtn);
  delBtn.addEventListener("click" , deleteToDo)
  li.id=newId
  toDoList.appendChild(li);
  const toDoObj = {
    text :text,
    id : newId
  }
  todos.push(toDoObj)
saveTodos();
}

function handleToDo (event){
  event.preventDefault();
  const inputValue=toDoinput.value;
    paintTodo(inputValue);
    toDoinput.value="";
}

function loadToDo(){
  const toDoName= localStorage.getItem(TODO_LS)
  if(toDoName !== null){
    const parse = JSON.parse(toDoName)
    parse.forEach(function(todo){
      paintTodo(todo.text)
    })
  }else{

  }
}

function init(){
  loadToDo();
  formToDo.addEventListener("submit", handleToDo)
}

init()
