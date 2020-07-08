import "./styles/styles.scss";
import FetchApi from "./js/fetchApi.js";
//подключает липовый объект
import data from "./js/data";
//подключает страничку одного фильма
import buildDetails from "./js/details";
import { template } from "handlebars";
const search = new FetchApi();
search.getPopular().then((popularMovies) => console.log(popularMovies));

const searchMovie = search.getByName("nemo"); // <<<------сюда запихнуть переменную с строкой с инпута вместо "nemo"
searchMovie.then((m) => console.log(m));

const viewer = document.querySelector("#postersViewer");

// console.log(viewer);

const GENRES = [];
const genrseFetch =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=be244f548a27d8c36fc000d6ba379c12&language=en-US";
fetch(genrseFetch)
  .then((j) => j.json())
  .then((d) => console.log(d));
//строит страничку одного фильма
buildDetails(data);
