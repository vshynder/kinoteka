import detailsTemplate from "../templates/details.hbs";
const viewer = document.querySelector("#postersViewer");

export default function buildDetails(data) {
  const markup = data.map((film) => detailsTemplate(film)).join("");
  // console.log(markup)
  viewer.insertAdjacentHTML("afterbegin", markup);

  // add to watched
  const watchedBtn = viewer.querySelector("#watched");
  // watchedBtn.addEventListener('change', console.log('yess'))
  //add to queue
  const queueBtn = viewer.querySelector("#queue");
}
