
// start all variables

let buttonSearch = document.querySelector(".page .content-left form .search");

let theInput = document.querySelector(".page .content-left form input");

let contentRight = document.querySelector(".page .content-right ");

let recipeDetails = document.querySelector(".recipe-details")



// button To Click to Get All Recipes from Function Called gitRecipe 
buttonSearch.addEventListener("click",gitRecipe)

// function To Get All Recipes Details  
contentRight.addEventListener("click", gitRecipeDetails)

// click On button Close To Remove Details 
recipeDetails.addEventListener("click", closeRecipeDetails)




// function get all dish 
function gitRecipe() {
    if (theInput.value === ''|| theInput.value == null) {
        theInput.placeholder = "Wright Recipe Name"
    } else {

        // API Name Details Link 
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${theInput.value}`)

        .then(result => {
            contentRight.innerHTML = '';
            if (result.ok) {
                return result.json();
            }
        })
        .then(allRecipe => {
        if(allRecipe.meals === null) {
            // Div Contains Message Error
        let overLay = document.createElement("div");

        overLay.className = "over-lay";

        overLay.innerHTML = "Error";

        contentRight.appendChild(overLay);

            } else {
                return allRecipe.meals;
            }
        })
        // loop on all Recipes 
        .then(recipes => {
            loopAllRecipes(recipes);
            
        });
    };
};

// function loop on all Recipes 
function loopAllRecipes(recipes) {
    recipes.forEach(recipe => {
        // create Main Div contains all Recipes
    let mainDiv = document.createElement("div");

    // create Img contains Img Recipes
    let mainDivImg = document.createElement("img");
    
    mainDivImg.src = recipe.strMealThumb;

        // create head contains head Recipes
    let mainDivHead = document.createElement("h2");

    mainDivHead.innerHTML = recipe.strMeal;

    // create Link contains Link Recipes
    let getRecipeDetails = document.createElement("a");

    getRecipeDetails.innerHTML = "Get Details";

    getRecipeDetails.className = "recipe-btn";

        // set dat-customAttribute on Details Link 
    getRecipeDetails.setAttribute("data-id",`${recipe.idMeal}`);

    // append Recipes In Main Div 
    mainDiv.append(mainDivImg, mainDivHead, getRecipeDetails);

    // set ClassName To MainDiv 
    mainDiv.className = "box";

    // append MainDiv in contentRight 
    contentRight.appendChild(mainDiv);

    theInput.value = '';

    });
};


// function get Details From API 
function gitRecipeDetails(e) {
    if (e.target.classList.contains("recipe-btn")) {

        // Get dat-customAttribute From Details Link 
        let id = e.target.getAttribute("data-id");

        // API Id Link 
        let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;


        fetch(apiUrl)
        .then(resultRecipe => {

            if (resultRecipe.ok) {
                return resultRecipe.json();
            }
        })
        //start function Show Details
        .then(resultRecipe => {
                displayRecipesDetails(resultRecipe);
            })
        }
};

// function Show Details
function displayRecipesDetails(recipeItem) {

    recipeDetails.innerHTML = '';

    recipeDetails.classList.remove("show-details");

    let item = recipeItem.meals[0];

    recipeDetails.innerHTML = `
    <div class="close">X</div>
    <h2>${item.strMeal}</h2>
    <p>strInstructions:</p>
    <p>${item.strInstructions}</p>
    <a href="${item.strYoutube} "target="_blank"" ">Watch Video</a>
    `
};  


// function Close Details
function closeRecipeDetails(e) {
    if (e.target.classList.contains("close")) {
        e.target.parentElement.classList.add("show-details");
    };
};



