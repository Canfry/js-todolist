const btnAdd = document.querySelector('.btn-add');
const list = document.querySelector('ul');
const input = document.querySelector('input');
const li = document.createElement('li');
const form = document.getElementById('form');
const btnDelete = document.querySelector('.delete');
const btnEdit = document.querySelector('edit');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo(text) {
  todos.push({
    text,
  });

  localStorage.setItem('todos', JSON.stringify(todos));
  return { text };
}

function removeTodo(text) {
  const newTodos = todos.filter((todo) => todo.text !== text);
  localStorage.setItem('todos', JSON.stringify(newTodos));
}

function createTodoElement({ text }) {
  const todosContainer = document.createElement('div');
  // const btnEdit = document.createElement('button');
  const btnDelete = document.createElement('button');
  const btnContainer = document.createElement('div');
  const li = document.createElement('li');
  li.innerText = text;

  todosContainer.classList.add('todos-container');
  btnContainer.classList.add('btn-container');
  btnDelete.classList.add('btn', 'delete');
  // btnEdit.classList.add('btn', 'edit');

  todosContainer.appendChild(li);
  todosContainer.appendChild(btnContainer);

  btnContainer.appendChild(btnDelete);
  // btnContainer.appendChild(btnEdit);

  btnDelete.innerHTML = 'Delete';
  // btnEdit.innerHTML = 'Edit';

  list.appendChild(todosContainer);
}

todos.forEach(createTodoElement);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTodo = addTodo(input.value);

  createTodoElement(newTodo);

  input.value = '';
});

document.body.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete')) {
    console.log(event.target.parentElement.parentElement);
    event.target.parentElement.parentElement.classList.add('animate');
    event.target.parentElement.parentElement.remove();
    console.log(
      event.target.parentElement.parentElement.firstChild.textContent
    );
    const deleteTodo =
      event.target.parentElement.parentElement.firstChild.textContent;

    removeTodo(deleteTodo);
  }
});
