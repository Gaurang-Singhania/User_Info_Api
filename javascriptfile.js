// Common Display Function to Display The User's details

function displayUsers(users) {

  let ihtml = "";
  for (const user of users) {

    ihtml += `<tr>
        <th scope="row">${user.id}</th>
        <td>${user.name}</td>
        <td> ${user.email}</td>
        <td>${user.username}</td>
        <td>${user.company.name} </td>
        <td><button class="to-do" userid="${user.id}" onclick="ToDo(${user.id})">To-do</button></td>
        <td><button class="album" userid="${user.id}" onclick="ToAlbum(${user.id})">Album</button></td>
      </tr>`;
}
      main.innerHTML = ihtml;
    };
/*
    ihtml += `<div class="info ">
      <div class="border-solid border-2 border-black bg-black h-20 mt-8 ml-4 mr-4 rounded-2xl flex vertical-align: middle ">
        <span class="id text-white mx-3  pt-4 background-color:  h-11">Id:${user.id} </span>
        <span class="name text-white mx-20 pt-4">Name:${user.name} </span>
        <span class="email text-white mx-20 pt-4">E-Mail: ${user.email}</span>
        <span class="username text-white mx-20 pt-4">Username: ${user.username}</span>
        <span class="company text-white mx-20 pt-4">Company:${user.company.name} </span>
      </div>
      <div class="requirements">
        <button class="to-do" userid="${user.id}" onclick="ToDo(${user.id})">To-do</button>
        <button class="album" userid="${user.id}" onclick="ToAlbum(${user.id})">Album</button>
      </div>
    </div>`;
  }
  main.innerHTML = ihtml;
};
*/


//Fetching User Details Using The Api Link and displaying using the common display function

let data;
async function getResponse() {
  try {
    const response = await fetch(" https://jsonplaceholder.typicode.com/users");
    data = await response.json();
    console.log(data);
    displayUsers(data);
  }
  catch (error) {
    console.log("Error: ", error)
  }
}


//Diverting the Main Page to respective user's to-do and album pages

function ToDo(userId) {
  console.log("Hello")
  location.href = `To-Do list/index.html?userId=${userId}`;
}

function ToAlbum(userId) {
  location.href = `album.html?photos&albumId=${userId}`;
}
getResponse();


// Adding Search Functionality to search Users using their Names

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('buttons')
  const searchBar = document.getElementById("searchBar");

  searchButton.addEventListener('click', () => {

    const searchTerm = searchBar.value.trim();
    console.log(searchTerm.toLowerCase());

    getResponse().then(() => {
      const users = Array.from(data); // Get all user divs
      const x = users.name;
      console.log(users)
      console.log(x)
      const filterUser = filterUserByName(users, searchTerm);

      // Displaying the searched user
      displayUsers(filterUser);
    });
  });
});


//Filtering Users Based On Name

function filterUserByName(users, searchTerm) {
  searchTerm = searchTerm.toLowerCase();  // Converting the  search term to lowercase 
  return users.filter((users) =>
    users.name.toLowerCase().includes(searchTerm)  //Converting the Actual name fetched to lower case and then searching it
  );
}


