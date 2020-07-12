import "./styles/styles.scss";
import { mainPageSlider } from "./js/details.js";
import { eventMaking } from "./js/input.js";
import fetchAPI from "./js/FetchApi.js";
import buildDetails from "./js/details.js";

eventMaking();
mainPageSlider.set(20);
export const header = document.querySelector(".header");

const viewer = document.querySelector("#postersViewer");
viewer.addEventListener("click", handleMovieClick);
const search = new fetchAPI();

export function fetchPage() {
  const fetchPageNum = Number(mainPageSlider.refs.current.textContent);
  return search.getPopular(fetchPageNum);
}

export async function handleMovieClick(e) {
  if (e.target.tagName === "DIV" || e.target.tagName === "UL") {
    return;
  }
  e.preventDefault();
  if (e.target.closest("a")) {
    const imgUrl = e.target.closest("a").querySelector(".main__item-img").src;
    const movies = await fetchPage();
    const film = movies.filter((moveiObj) => moveiObj.poster_path == imgUrl)[0];
    const prevPage = viewer.innerHTML;
    buildDetails(film, prevPage);
  }
}

fetchPage().then((d) => console.log(d));
