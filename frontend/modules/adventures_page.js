
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let searchParams = new URLSearchParams(search);
  let city = searchParams.get('city');
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  try{
    let response = await fetch(config.backendEndpoint+"/adventures?city="+city);
    let data = await response.json();
    return data;
  }catch(err){
      return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((props) => {
    //finding the targeting parent element 
    let dataDiv = document.getElementById("data");
    
    //create new element -----> representing one column
    let newCol = document.createElement("div");
    newCol.setAttribute("class","col-md-3");


    //rounded border for the cards
    let newCardEle = document.createElement("div");
    newCardEle.setAttribute("class","mb-4 rounded");
    newCardEle.setAttribute("style","border: 1px solid rgb(0,0,0,0.1);");

    //category banner for the cards---->('party' on the top right of the card)
    let catBanner = document.createElement("div");
    catBanner.setAttribute("class","category-banner");
    catBanner.innerText = props.category;


    //new anchor tag for fetching the image 
    let newATAg = document.createElement("a");
    newATAg.setAttribute("class","activity-card");
    newATAg.setAttribute("id",props.id);
    newATAg.setAttribute("href","detail/?adventure="+props.id);

    //image element to fetch the images
    let newImgEle = document.createElement("img");
    newImgEle.setAttribute("src",props.image);

    newATAg.appendChild(newImgEle);


    // new card information elements
    // 1-> place and price
    // 2-> duration 

    //1
    let cardInfo1 = document.createElement("div");
    cardInfo1.setAttribute("class","d-flex justify-content-between");
    let name = document.createElement("p");
    name.setAttribute("style","padding-left: 5px")
    let costPerHead = document.createElement("p");
    name.innerText = props.name;
    costPerHead.innerText = "₹"+props.costPerHead+"/-";
    cardInfo1.appendChild(name);
    cardInfo1.appendChild(costPerHead);

    //2
    let cardInfo2 = document.createElement("div");
    cardInfo2.setAttribute("class","d-flex justify-content-between");
    let duration = document.createElement("p");
    duration.setAttribute("style","padding-left: 5px")
    let durVal = document.createElement("p");
    durVal.setAttribute("style","padding-right: 8px")
    duration.innerText = "Duration";
    durVal.innerText = props.duration+" hrs";
    cardInfo2.appendChild(duration);
    cardInfo2.appendChild(durVal);

    //finally appening childs in respective parent elements
    newCardEle.appendChild(catBanner);
    newCardEle.appendChild(newATAg);
    newCardEle.appendChild(cardInfo1);
    newCardEle.appendChild(cardInfo2);

    newCol.appendChild(newCardEle);
    dataDiv.appendChild(newCol);

    
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
   list = list.filter((item) =>{
     return item.duration>=low && item.duration<=high;
   });

   return list;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

   list  = list.filter((item) =>{
      for(const category of categoryList){
        if(item.category === category)
          return item;
      }
  });
  return list;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  //when only filter by category exists
  if(filters.category.length!=0 && filters.duration===""){
    list = filterByCategory(list,filters.category);
  }

  //when only filter by duration  exists
  if(filters.duration!="" && filters.category.length===0){

    let lh = filters.duration.split("-");
    let low = lh[0];
    let hi = lh[1];
    list = filterByDuration(list,low,hi);
  }

  //when both are exists
  if(filters.category.length!=0  && filters.duration!=""){
    list = filterByCategory(list,filters.category);
    
    let lh = filters.duration.split("-");
    let low = lh[0];
    let hi = lh[1];
    list = filterByDuration(list,low,hi);

  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
     window.localStorage.setItem("filters",JSON.stringify(filters));


  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  var filters = window.localStorage.getItem("filters");


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  filters.category.forEach((key) => {
    let categoryListParent = document.getElementById("category-list");
    let newPara = document.createElement("p");
    newPara.setAttribute("class","category-filter");
    newPara.innerText = key;

    categoryListParent.appendChild(newPara);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
