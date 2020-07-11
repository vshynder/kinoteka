import "./styles/styles.scss";
import FetchApi from "./js/fetchApi.js";
import { mainPageSlider } from "./js/details.js";
import "./js/input.js";

mainPageSlider.set(20);

const search = new FetchApi();
const searchMovie = search.getByName("nemo"); // <<<------сюда запихнуть переменную с строкой с инпута вместо "nemo"

// input();
