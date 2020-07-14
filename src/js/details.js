import detailsTemplate from "../templates/details.hbs";
import PageSlider from "./PageSlider";
import { openMyLib, addToMyLib, isFilmInLS, deleteFilm } from "../js/storage"; //Дима Иванов
const viewer = document.querySelector("#postersViewer");
import { header } from "../index.js";

const mainPageSlider = new PageSlider();

export default function buildDetails(data, previousPage, currentPageNumber) {
  //если передаётся ОДИН ОБЪЕКТ
  const markup = detailsTemplate(data);
  header.classList.remove("background-01");
  header.classList.remove("background-02");
  header.classList.add("background-03");
  viewer.innerHTML = markup;

  const refs = {
    //вся секция details
    details: viewer.querySelector("#details"),
    // Кнопка добавляет в просмотренное
    watchedBtn: viewer.querySelector("#watched"),
    //Кнопка добавляет в очередь
    queueBtn: viewer.querySelector("#queue"),
    //Кнопка вернуться
    returnBtn: viewer.querySelector("#return"),
  };
  //Функционал проверки содержимого LS при загрузке страницы details - Дима Иванов
  if (isFilmInLS("watched", data) !== false) {
    refs.watchedBtn.isActive = true;
    refs.watchedBtn.classList.add("active");
    refs.watchedBtn.textContent = "Remove from watched";
  }
  if (isFilmInLS("queue", data) !== false) {
    refs.queueBtn.isActive = true;
    refs.queueBtn.classList.add("active");
    refs.queueBtn.textContent = "Remove from queue";
  }

  // Пока не придумал, где снять этот слушатель`
  refs.details.addEventListener("click", handleBtn);

  //Работа с кнопками + local storage
  function handleBtn(e) {
    //Определяет нажата ли именно кнопка
    if (e.target.tagName !== "BUTTON") {
      return;
    }

    //Определяет нажатие кнопки return
    if (e.target === refs.returnBtn) {
      // место для функции, отрисовывающей страничку home
      viewer.innerHTML = previousPage;
      // const slider = document.querySelector("#pageSlider");
      // slider.removeAttribute("style", "display:none");
      // console.log(previousPage);

      header.classList.add("background-01");
      header.classList.remove("background-02");
      header.classList.remove("background-03");
      if (currentPageNumber) {
        mainPageSlider.set(20, currentPageNumber);
        window.scrollTo(top);
      }
      // refs.details.removeEventListener("click", handleBtn);
    }
    //Кнопка включается при нажатии
    if (!e.target.isActive) {
      enableBtn(e);
      return;
    }
    //Кнопка отключается при нажатии
    if (e.target.isActive) {
      disableBtn();
      return;
    }

    //Включает кнопку: делает активной, добавляет стиль, определяет какая из кнопок включилась,добавляет в local storage
    function enableBtn(e) {
      //делает кнопку активной
      e.target.isActive = true;
      //добавляет стили
      e.target.classList.add("active");
      //Определяет включение кнопки Watched ,здесь добавить в local storage просмотренное
      if (e.target === refs.watchedBtn) {
        addToMyLib("watched", data); //Дима Иванов
        e.target.textContent = "Remove from watched";
        return;
      }
      //Определяет включение кнопки Queue,здесь добавить в local storage очередь
      if (e.target === refs.queueBtn) {
        addToMyLib("queue", data); //Дима Иванов
        e.target.textContent = "Remove from queue";
        return;
      }

      return;
    }
    //Выключает кнопку: делает неактивной, убирает стили, определяет какая из кнопок выключилась, добавляет в local storage
    function disableBtn() {
      //делает кнопку неактивной
      e.target.isActive = false;
      //удаляет стили
      e.target.classList.remove("active");

      //Определяет выключение кнопки Watched, здесь удалить из local storage просмотренное
      if (e.target === refs.watchedBtn) {
        deleteFilm("watched", data);
        e.target.textContent = "Add to watched";

        return;
      }
      //Определяет выключение кнопки Queue,  здесь удалить из local storage очередь
      if (e.target === refs.queueBtn) {
        deleteFilm("queue", data);
        e.target.textContent = "Add to queue";
        return;
      }
      return;
    }
  }
}

export { mainPageSlider };
