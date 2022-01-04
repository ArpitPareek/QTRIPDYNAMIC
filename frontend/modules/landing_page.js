import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const response = await fetch(config.backendEndpoint + "/cities");
    const data= await response.json();
    return data;
    
  }catch(error){
    return null;
  }
  
} 

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  let divisionData = document.getElementById("data");

  //new div element with specified attribute
  let newCol = document.createElement("div");
  newCol.setAttribute("class","col-6 col-sm-3");

  //the new anchor tag for wrapping the image
  let newAnchor = document.createElement("a");
  newAnchor.setAttribute("class","tile");
  newAnchor.setAttribute("id",id);
  newAnchor.setAttribute("href","pages/adventures/?city="+id);


  //new image tag for rendering the image 
  let newImg = document.createElement("img");
  newImg.setAttribute("class","img-fluid");
  newImg.setAttribute("src",image);

  //new <p> tag for placing the text over the image 
  let newPTag  = document.createElement("p");
  newPTag.setAttribute("class","tile-text");
  newPTag.innerText = city+"\n"+description;

  //img tag and p tag is pushed as child of anchor tag
  newAnchor.appendChild(newImg);
  newAnchor.appendChild(newPTag);
  newCol.appendChild(newAnchor);
  divisionData.appendChild(newCol);
}

export { init, fetchCities, addCityToDOM };
