import "./styles/styles.scss";
import { mainPageSlider } from "./js/details.js";
import { eventMaking } from "./js/input.js";
import fetchAPI from "./js/FetchApi.js";
import { getFilmsData } from "./js/storage.js";
import buildDetails from "./js/details.js";
import "./modalwindow.js";

eventMaking();
mainPageSlider.set(20);
export const header = document.querySelector(".header");

const viewer = document.querySelector("#postersViewer");
const search = new fetchAPI();

export async function handleMovieClick(e, popular = true, name, ls) {
  if (
    (e === false && typeof ls === "object") ||
    (e === false && (name === "watched" || name === "queue"))
  ) {
    [e, popular, name, ls] = [ls, e, popular, name];
  }

  if (e.target.tagName === "DIV" || e.target.tagName === "UL") {
    return;
  }

  e.preventDefault();

  if (e.target.closest("a")) {
    const imgUrl = e.target.closest("a").querySelector(".main__item-img").src;
    let movies;

    if (!ls) {
      movies = await getMoviesArray(popular, name, ls);
    } else if (ls === "watched" || ls === "queue") {
      movies = getMoviesArray(popular, name, ls);
      console.log(e, popular, name, ls, movies);
    }

    // console.log(movies);
    const film = movies.filter((moveiObj) => moveiObj.poster_path == imgUrl)[0];
    if (!film) {
      return;
    }
    const prevPage = viewer.innerHTML;
    buildDetails(film, prevPage);
  }
}

export function getMoviesArray(popular = true, name = "", ls = "") {
  if (popular) {
    const fetchPageNum = Number(mainPageSlider.refs.current.textContent);
    return search.getPopular(fetchPageNum);
  }
  if (name !== "") {
    return search.getByName(name);
  }
  if (ls !== "") {
    const moviiesArr = getFilmsData(ls);
    console.log(moviiesArr);

    return moviiesArr;
  }
  return null;
}
