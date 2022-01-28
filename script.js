//Initial DOM nodes & search functions
const button = document.getElementById("s-Button");
const imgHolder = document.getElementById("imgHolder");
const msgText = document.getElementById("textHolder");


button.addEventListener("click", searchSubmit);

//Called upon when performing each search
function searchSubmit(){
    userSearch = document.getElementById("user-search").value;
    console.log(userSearch);
    searchInquiry(userSearch);
}

//Function for doing search logic
function searchInquiry(searchInput){
    const apiKey = "0b6605f89e45e67be590464eba3fd871";

    errorTextHandler(searchInput);

    let url = `https://www.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&text=${searchInput}&format=json&nojsoncallback=1&per_page=1&page=1`;

    fetch(url).then(
        function(response){
            console.log(response);
            if(response.status >= 200 && response.status <= 300){
                return response.json();
            }
            else{
                throw msgText.innerText = "An error occured";
            }
        }
    ).then(
        function(data){
            console.log(data);
            imageCreator(data.photos.photo[0]);
        }
    ).catch(
        function(error){
            console.log(error);
            msgText.innerText = "No such image found";
        }
    );
}

function imageCreator(imageObject){
    let imgObj = imageObject;
    let imgSize = "c";

    let imageUrl = `https://live.staticflickr.com/${imgObj.server}/${imgObj.id}_${imgObj.secret}_${imgSize}.jpg`;

    imgHandler(imageUrl);
}

function errorTextHandler(inputText){
    if (inputText === ""){
        msgText.innerText = "Please enter a image name";
    }
    else {
        msgText.innerText = "";
    }
}

//Checks if image exists, changes url if it does
function imgHandler(imgUrl){
    const imgDom = document.querySelector("img");
    if (!imgDom){
        const image = document.createElement("img"); 
        imgHolder.appendChild(image);
        image.src = imgUrl;
    }
    else if (imgDom){
        imgDom.src = imgUrl;
    }
}