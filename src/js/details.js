import detailsTemplate from "../templates/details.hbs";
const viewer = document.querySelector("#postersViewer");

export default function buildDetails(data) {
  //Если передается массив объектов
  // const markup = data.map(film => detailsTemplate(film)).join('')
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
  };

  // Пока не придумал, где снять этот слушатель
  refs.details.addEventListener("click", handleBtn);

  //Работа с кнопками + local storage
  function handleBtn(e) {
    //Определяет нажата ли именно кнопка
    if (e.target.tagName !== "BUTTON") {
      return;
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
        console.log("Watched is enable (проверка)"); //удалить
        return;
      }
      //Определяет включение кнопки Queue,здесь добавить в local storage очередь
      if (e.target === refs.queueBtn) {
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
        console.log("Watched is disable(проверка)"); //удалить
        return;
      }
      //Определяет выключение кнопки Queue,  здесь удалить из local storage очередь
      if (e.target === refs.queueBtn) {
        console.log("Queue is disable(проверка)"); //удалить
        return;
      }
      return;
    }
  }
}
