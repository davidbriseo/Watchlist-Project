const myWatchlistDisplay = document.getElementById("myWatchlistDisplay")
let myMoviesLocalStorage = JSON.parse(localStorage.getItem("myWatchlist"))
let storedMovies = []
let counter = 0

if (myMoviesLocalStorage){
    myWatchlistDisplay.innerHTML = " "
    myWatchlistDisplay.classList.remove("start-page-container")
    myWatchlistDisplay.innerHTML = myMoviesLocalStorage.join(" ")
    for (movie of myMoviesLocalStorage){
        storedMovies.push(movie)
    }
    localStorage.setItem("storedMovies", JSON.stringify(storedMovies))
}

let assignBtnValue = () => {
    const watchlistBtnList = myWatchlistDisplay.querySelectorAll("button")
    for (btn of  watchlistBtnList){
        btn.addEventListener("click", btnAction)
        btn.innerHTML = `<i class="fa-solid fa-circle-minus"></i> Remove`
        btn.value = counter
        counter++
    }
}

assignBtnValue()

function btnAction(event){
    counter = 0
    let movieSelected = event.target.parentNode.parentNode.parentNode
    let movieValue = event.target.getAttribute('value')
    let movieTitle = document.getElementsByClassName("movie-title").item(movieValue).innerHTML
    let newMoviesArray = myMoviesLocalStorage.filter( 
        item => !item.includes(`<p class="movie-title">${movieTitle}</p>`)
    )

    localStorage.setItem("myWatchlist", JSON.stringify(newMoviesArray))
    localStorage.setItem("storedMovies", JSON.stringify(newMoviesArray))
    
    myMoviesLocalStorage = newMoviesArray

    movieSelected.textContent = " "
    movieSelected.classList.remove("columns")
    myWatchlistDisplay.innerHTML = newMoviesArray.join("")

    assignBtnValue()
    
    if( localStorage.getItem("myWatchlist") ){
        let myWatchlistStatus = JSON.parse(localStorage.getItem("myWatchlist"))
        let storedMoviesStatus = JSON.parse(localStorage.getItem("storedMovies"))
        if(myWatchlistStatus.length === 0 && storedMoviesStatus.length === 0){
            localStorage.clear()
            myWatchlistDisplay.classList.add("start-page-container")
            myWatchlistDisplay.innerHTML = `
                <p id="myWatchlistText" class="start-page-default-text">
                    Your watchlist is looking a little empty...<br>
                </p>
                <p class="add-movies-text">
                    <i class="fa-solid fa-circle-plus"></i> 
                    Let’s add some movies!
                </p>
            `    
        }
        
    }
}
