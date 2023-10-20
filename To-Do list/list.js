const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
let button = document.getElementById('b1'); // Used for changing the Name of the Button while editing the tasks


const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

function addTask() {
  if (inputBox.value === '') {
    alert("You Haven't Added Any Task As Yet!!")
  }
  else if (inputBox.dataset.editId) {

    let taskId = inputBox.dataset.editId;
    let editedLi = document.querySelector(`li[data-id="${taskId}"]`);
    let updatedTitle = inputBox.value;
    editedLi.firstChild.textContent = updatedTitle;

    updateTask(taskId, updatedTitle);
    inputBox.dataset.editId = null; // Clearing the editId
    button.innerHTML = "Add"; //Changing the Edit name of button back to Add
  }
  else {
    console.log("Added new task: ", inputBox.value)
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);

    let span1 = document.createElement('span');
    span1.innerHTML = '\&#128394';
    span.style.marginLeft = '30px';
    span.style.marginRight = '30px';
    span1.classList.add('edit');
    li.appendChild(span1);

  }

  inputBox.value = '';
}



listContainer.addEventListener('click', function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle('checked');
  }
  else if (e.target.tagName === "SPAN") {
    if (e.target.classList.contains('delete')) {
      e.target.parentElement.remove();
    }
    else if (e.target.tagName === "SPAN" && e.target.classList.contains('edit')) {
      let task = e.target.parentElement;
      let taskText = task.firstChild.textContent;
      inputBox.value = taskText;
      inputBox.dataset.editId = task.dataset.id;
      console.log(button.innerHTML)
      button.innerHTML = "Edit";
    }
  }
}, false);



let data;
async function getTODOS() {
  try {
    const response = await fetch(" https://jsonplaceholder.typicode.com/todos");
    data = await response.json();
    console.log(data);
    displayTODOS(data);
  }
  catch (error) {
    console.log("Error: ", error)
  }
}

getTODOS();

function displayTODOS(todos) {
  for (const todo of todos) {

    console.log(todo.userId)
    if (parseInt(todo.userId) == parseInt(userId)) {

      let li = document.createElement('li');
      li.innerHTML = todo.title;
      li.dataset.id = todo.id;
      listContainer.appendChild(li);

      //let taskId=`${todo.id}`
      //console.log(taskId);


      if (todo.completed) {    // Adding checked to differentiate between tasks done and left as given in api
        li.classList.add('checked');
      }

      let span = document.createElement('span');
      span.innerHTML = '\u00d7';
      span.classList.add('delete');
      li.appendChild(span);

      let span1 = document.createElement('span');
      span1.innerHTML = '\&#128394';
      span.style.marginLeft = '30px';
      span.style.marginRight = '30px';
      span1.classList.add('edit');
      li.appendChild(span1);

    }
  }
}


async function updateTask(taskId, updatedTask) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: updatedTask,
      }),
    });

    console.log(`Task ${taskId} updated`);
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

