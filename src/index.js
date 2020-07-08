import "./styles/styles.scss";
import FetchApi from "./js/fetchApi.js";
//подключает липовый объект
import data from './js/data'
//подключает страничку одного фильма
import buildDetails from './js/details'
const search = new FetchApi();
search.getPopular(10).then((popularMovies) => console.log(popularMovies));
const searchMovie = search.getByName("nemo");
searchMovie.then((m) => console.log(m));

const viewer = document.querySelector("#postersViewer");

console.log(viewer);
//строит страничку одного фильма
buildDetails(data)