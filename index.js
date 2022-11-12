const movieInput = document.getElementById("siteSearch")
const searchDisplay = document.getElementById("searchDisplay")
let myMoviesArray = []

if( localStorage.getItem("myWatchlist") ){
    let myWatchlistStatus = JSON.parse(localStorage.getItem("myWatchlist"))
    let storedMoviesStatus = JSON.parse(localStorage.getItem("storedMovies"))
    if(myWatchlistStatus.length === 0 && storedMoviesStatus.length === 0){
        localStorage.clear()    
    }
}

document.getElementById("search-btn").addEventListener("click", async ()=>{
    searchDisplay.classList.remove("start-page-container")
    searchDisplay.innerHTML = " "
    let movieSearchList = []
    let movieString = movieInput.value
    movieInput.value = ""
    const res = await fetch(`https://www.omdbapi.com/?apikey=9456c81c&s=${movieString}&type=movie`)
    const data = await res.json()
    if(data.Response === "True"){
        for (title of data.Search){movieSearchList.push(title.Title)}   
        
        let forQueryList = movieSearchList.map( name => name.replace(/&/g, "and") )

        async function movieInfoRender(){
            let counter = 0
            
            for (item of forQueryList){
                const resp = await fetch(`https://www.omdbapi.com/?apikey=9456c81c&t=${item}`)
                const eachMovie = await resp.json()
                searchDisplay.innerHTML += movieInfoHTML(eachMovie, counter)
                counter++
            }
            
            counter = 0
            for (number of forQueryList){
                let btnId = document.getElementById(`btn-${counter}`)
                btnId.addEventListener("click", btnAction)
                counter++
            }
        }
        movieInfoRender()
    } else {
        searchDisplay.classList.add("start-page-container")
        searchDisplay.innerHTML = `<p>Unable to find what you’re looking for. Please try another search</p>`
    } 
})

function btnAction(event){
    
    let storedMovies = JSON.parse(localStorage.getItem("storedMovies"))

    if (storedMovies) myMoviesArray = storedMovies 
    
    let movieIdString = `movie-${event.target.getAttribute('value')}`
    
    let movieEntryHTML = document.getElementById(movieIdString).outerHTML
    myMoviesArray.push(movieEntryHTML)
    localStorage.setItem("myWatchlist", JSON.stringify(myMoviesArray))
}

let movieInfoHTML = (eachMovie, counter) =>{
    return   `
        <div id="movie-${counter}" class="columns">
            <div class="col img-search-display">
                <img src="${eachMovie.Poster}" alt="${eachMovie.Title} poster" class="movie-poster"/>
            </div>
            <div class="col movie-info">
                <div class="movie-header">
                    <p class="movie-title">${eachMovie.Title}</p>
                    <p class="movie-rating">
                        <i class="fa-solid fa-star"></i>${eachMovie.imdbRating}
                    </p>
                </div>
                <div class="movie-Run-Genre">
                    <p class="movie-runtime">${eachMovie.Runtime}</p>
                    <p class="movie-genre">${eachMovie.Genre}</p>
                    <button id="btn-${counter}" value="${counter}" class="movie-plus-icon">
                        <i class="fa-solid fa-circle-plus"></i>
                        Watchlist
                    </button>
                </div>
                <p class="movie-description">${eachMovie.Plot}</p>
            </div>
        </div>
        `
}