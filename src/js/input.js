import FetchAPI from "./FetchApi";
import { mainPageSlider } from "./details.js";
import pageViewerTemplate from "../templates/postersViewerTemplate.hbs";
import { handleMovieClick, getMoviesArray, header } from "../index.js";
import { getFilmsData } from "./storage.js";
import buildDetails from "./details.js";
const viewer = document.querySelector("#postersViewer");
viewer.addEventListener("click", handleMovieClick);

const _ = require("lodash");

const search = new FetchAPI();
const errorString = document.querySelector(".js-error-notification");
const homeButton = document.querySelector(".js-home-btn");
const libraryButton = document.querySelector(".js-library-btn");
const myLibraryBtns = document.querySelector(".header-btn-container");
const inputContainer = document.querySelector(".big-input-container");
const watchedTab = document.querySelector(".js-right-header-btn-container");
const queryTab = document.querySelector(".js-left-header-btn-container");

const queryBtnOnWatchedTab = document.querySelector(".js-right-header-btn");
const watchedBtnOnQueryTab = document.querySelector(".js-left-header-btn");
const logo = document.querySelector(".logo-writing");

queryBtnOnWatchedTab.addEventListener("click", handleQueryBtn);
watchedBtnOnQueryTab.addEventListener("click", handleWatcheBtn);

function handleQueryBtn() {
  queryTab.classList.remove("d-n");
  watchedTab.classList.add("d-n");
  const data = getFilmsData("queue");

  viewer.innerHTML = pageViewerTemplate(data);
}
function handleWatcheBtn() {
  queryTab.classList.add("d-n");
  watchedTab.classList.remove("d-n");
  const data = getFilmsData("watched");

  viewer.innerHTML = pageViewerTemplate(data);
}

homeButton.addEventListener("click", handleHomeButtonClick);
logo.addEventListener("click", handleHomeButtonClick);

function handleHomeButtonClick() {
  // if (homeButton.classList.contains("header-top-orange-btn")) {
  //   return;
  // }
  libraryButton.classList.remove("header-top-orange-btn");
  homeButton.classList.add("header-top-orange-btn");
  header.classList.add("background-01");
  header.classList.remove("background-02");
  header.classList.remove("background-03");
  inputContainer.classList.remove("d-n");
  myLibraryBtns.classList.add("d-n");
  queryTab.classList.add("d-n");
  watchedTab.classList.add("d-n");
  mainPageSlider.set(20);
  viewer.addEventListener("click", handleMovieClick);
}

libraryButton.addEventListener("click", handleLibraryClick);
function handleLibraryClick() {
  // if (libraryButton.classList.contains("header-top-orange-btn")) {
  //   return;
  // }
  viewer.removeEventListener("click", handleMovieClick);

  homeButton.classList.remove("header-top-orange-btn");
  libraryButton.classList.add("header-top-orange-btn");
  mainPageSlider.hide();
  header.classList.remove("background-01");
  header.classList.add("background-02");
  header.classList.remove("background-03");
  inputContainer.classList.add("d-n");
  myLibraryBtns.classList.remove("d-n");

  const moviesArr = getFilmsData("watched");
  viewer.innerHTML = pageViewerTemplate(moviesArr);
  viewer.addEventListener(
    "click",
    handleMovieClick.bind(null, false, "", "watched")
  );
}
// function renderEachImage(movies) {
//   eventUl.addEventListener("click", handleMovieClick.bind(movies));
// }
// function handleMovieClick(e) {
//   if (e.target.tagName === "UL") {
//     return;
//   }
//   e.preventDefault();
//   const imgUrl = e.target.closest("a").querySelector(".main__item-img").src;
//   const film = this.filter((moveiObj) => moveiObj.poster_path == imgUrl)[0];

//   const main__list = document.querySelector(".main__list");
//   main__list.removeEventListener("click", handleMovieClick);
//   const prevPage = viewer.innerHTML;

//   buildDetails(film, prevPage);
// }

function eventMaking() {
  const inputLine = document.querySelector(".js-search-field");

  const debounced = _.debounce(searchFormInputHandler, 1500);
  inputLine.addEventListener("input", debounced);
}
async function searchFormInputHandler(e) {
  const value = e.target.value;
  if (value) {
    viewer.addEventListener(
      "click",
      handleMovieClick.bind(null, false, value, "")
    );

    const movies = await getMoviesArray(false, value);
    inputChecking(movies);
    e.target.value = "";
  }
}

function inputChecking(input) {
  if (typeof input === "string") {
    errorString.textContent = input;
    return;
  }
  mainPageSlider.hide();
  viewer.innerHTML = pageViewerTemplate(input);
  viewer.removeEventListener("click", handleMovieClick);
}
export { eventMaking };
