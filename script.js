const apiKey = "1c96c72d";
const movieNameInput = document.getElementById("movieName");
const yearLaunchedInput = document.getElementById("yearLaunched");
const searchBtn = document.getElementById("searchBtn");
const movieList = document.getElementById("movieList");
const errorPopup = document.getElementById("errorPopup");
const errorMessage = document.getElementById("errorMessage");
const closePopupBtn = document.getElementById("closePopupBtn");

let moviesData = [];

function fetchMovies() {
  const movieName = movieNameInput.value;
  const yearLaunched = yearLaunchedInput.value;

  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.Error) {
        throw new Error(data.Error);
      }
      moviesData = data.Search;
      if (yearLaunched) {
        moviesData = moviesData.filter(
          (movie) => parseInt(movie.Year) >= parseInt(yearLaunched)
        );
      }
      displayMovies();
    })
    .catch((error) => {
      displayError(error.message);
    });
}

// Function to display movies in the list
function displayMovies() {
  movieList.innerHTML = "";
  moviesData.forEach((movie) => {
    const li = document.createElement("li");
    li.innerHTML = `<h2>${movie.Title}</h1> <p>(${movie.Year})</p> <img src="${movie.Poster}" alt="${movie.Title}"> `;

    movieList.appendChild(li);
  });
}

function displayError(message) {
  errorMessage.textContent = message;
  errorPopup.style.display = "block";
}

searchBtn.addEventListener("click", fetchMovies);

closePopupBtn.addEventListener("click", () => {
  errorPopup.style.display = "none";
});

window.addEventListener("load", () => {
  const storedData = localStorage.getItem("moviesData");
  if (storedData) {
    moviesData = JSON.parse(storedData);
    displayMovies();
  }
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("moviesData", JSON.stringify(moviesData));
});
