import detailsTemplate from "../templates/details.hbs";
import PageSlider from "./PageSlider";
const viewer = document.querySelector("#postersViewer");

const mainPageSlider = new PageSlider();

export default function buildDetails(data, previousPage) {
  //если передаётся ОДИН ОБЪЕКТ
  const markup = detailsTemplate(data);
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

      mainPageSlider.set(20);
      window.scrollTo(top);
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
        e.target.textContent = "Remove from watched";
        console.log("Watched is enable (проверка)"); //удалить
        return;
      }
      //Определяет включение кнопки Queue,здесь добавить в local storage очередь
      if (e.target === refs.queueBtn) {
        e.target.textContent = "Remove from queue";
        console.log("Queue is enable(проверка)"); //удалить
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
        e.target.textContent = "Add to watched";
        console.log("Watched is disable(проверка)"); //удалить
        return;
      }
      //Определяет выключение кнопки Queue,  здесь удалить из local storage очередь
      if (e.target === refs.queueBtn) {
        e.target.textContent = "Add to queue";
        console.log("Queue is disable(проверка)"); //удалить
        return;
      }
      return;
    }
  }
}

export { mainPageSlider };
