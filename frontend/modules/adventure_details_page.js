import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
    let adventureId = params.get('adventure');
    return adventureId;



  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let url = config.backendEndpoint+'/adventures/detail?adventure='+`${adventureId}`;
  try{
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }catch(error){
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // adding adventure name
  let advElement = document.getElementById("adventure-name");
  advElement.innerHTML = adventure.name;


  // adventure subtitle
  let advSubTitle = document.getElementById("adventure-subtitle");
  advSubTitle.innerHTML = adventure.subtitle;

    //advanture content
  let advContent = document.getElementById("adventure-content");
  advContent.innerHTML = adventure.content;

  
  let photoGalleryDivEle = document.getElementById("photo-gallery");
  adventure.images.forEach((img) => {
    let div_for_image = document.createElement("div");
    let img_tag = document.createElement("img");
    img_tag.setAttribute("src", img);
    img_tag.setAttribute("class", "activity-card-image");
    div_for_image.appendChild(img_tag);
    photoGalleryDivEle.appendChild(div_for_image);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let newPhotoGalleryDivElement = document.getElementById("photo-gallery");
  newPhotoGalleryDivElement.innerHTML =
    '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel"><ol id="carouselOrderedList" class="carousel-indicators"></ol><div class="carousel-inner"></div><a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleIndicators" role="button"data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';
  
  
    let carouselOL = document.getElementsByClassName("carousel-indicators");
  let carouselInnerDiv = document.getElementsByClassName("carousel-inner");

  
  for (let index = 0; index < images.length; index++) {
    let list_item = document.createElement("li");
    list_item.setAttribute("data-taregt", "#carouselExampleIndicators");
    list_item.setAttribute("data-slide-to", index.toString());
    let img_div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("class", "activity-card-image d-block w-100");
    img.setAttribute("src", images[index]);
    if (index == 0) {
      list_item.setAttribute("class", "active");
      img_div.setAttribute("class", "carousel-item active");
    } else {
      img_div.setAttribute("class", "carousel-item");
    }
    img_div.appendChild(img);
    carouselInnerDiv[0].appendChild(img_div);
    carouselOL[0].appendChild(list_item);
  }
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = `${adventure.costPerHead}`;
  }
  else {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let updateCost  = document.getElementById("reservation-cost");
  updateCost.innerHTML  = `${adventure.costPerHead*persons}`;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");

  form.addEventListener("submit",function(event){
    event.preventDefault();

    let totalCost = document.getElementById('reservation-cost').innerText;
    let persons = totalCost/adventure.costPerHead;
    let name= form.elements.namedItem("name").value;
    let date = form.elements.namedItem("date").value;
    let url = config.backendEndpoint+"/reservations/new";
    const formData = {
      name:name,
      date:date,
      person:persons,
      adventure:adventure.id,
    }
    const options = {
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }

    fetch(url,options)
  .then(data =>{
    if(!data.ok){
      throw Error(data);
    }
    return data.json();
  })
  .then(update =>{
    alert("Success!");
    console.log(update);
    location.reload();
  })
  .catch(e =>{
    console.log(JSON.stringify(e));
  })
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
      document.getElementById('reserved-banner').style.display = "block";
    else 
    document.getElementById('reserved-banner').style.display = "none"; 

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
