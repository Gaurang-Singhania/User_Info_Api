// Fetching photos of users from the api


const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get('albumId');

let data1;
async function getResponse1() {
  try {
    const response = await fetch(" https://jsonplaceholder.typicode.com/photos");
    data1 = await response.json();
    console.log(data1);
    displayUsers(data1);
   
  }
  catch (error) {
    console.log("Error: ", error)
  }
}
getResponse1();


function displayUsers(users) {

    let ihtml = "";
    for (const user of users) {
    
      if (parseInt(user.albumId) === parseInt(albumId)) {
      ihtml += `<div class="info ">
        <div class="contain">
          <span class="id font-bold text-black">Id:${user.id}</span>
          <span class="title font-semibold text-black mx-20 pt-4">Title:${user.title} </span>
          <div class="photomain">
          <span class="photo"><img src="${user.url}"></img></span>
        </div>
        </div>
      </div>`;
      }
    }
    main.innerHTML = ihtml;
  };
  