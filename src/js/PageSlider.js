import pageViewerTemplate from "../templates/postersViewerTemplate.hbs";
import pageSliderTemplate from "../templates/pageSliderTemplate.hbs";
import fetchAPI from "./FetchApi.js";
import buildDetails from "./details";

export default class PageSlider {
  constructor(containerId = "pageSlider") {
    this.refs = {
      container: document.querySelector(`#${containerId}`),
    };
    this._totalPages = null;
    this.refs.container.addEventListener(
      "click",
      this.handlePageSlider.bind(this)
    );
    this.fetchApi = new fetchAPI();
  }

  set totalPages(value) {
    return (this._totalPages = value);
  }

  get totalPages() {
    return this._totalPages;
  }

  set(totalPages, currentPage = 1) {
    this.totalPages = totalPages;
    this.show();
    this.makeRefs(this.refs.container);
    this.update(currentPage);
  }

  handlePageSlider(e) {
    switch (e.target.nodeName) {
      case "BUTTON":
        this.handleBtn(e);
        break;
      case "SPAN":
        this.handlePage(e);
        break;
      default:
        return;
    }
  }

  handleBtn(e) {
    const currentPage = Number(this.refs.current.textContent);
    const targetPage =
      e.target.dataset.move === "left"
        ? currentPage > 1
          ? currentPage - 1
          : currentPage
        : currentPage < this.totalPages
        ? currentPage + 1
        : currentPage;
    if (currentPage === targetPage) {
      return;
    }
    this.update(targetPage);
  }

  handlePage(e) {
    if (e.target === this.refs.current) {
      return;
    }
    this.update(Number(e.target.textContent));
  }

  show() {
    this.refs.container.innerHTML = pageSliderTemplate();
  }

  hide() {
    this.refs.container.innerHTML = "";
  }

  makeRefs(container) {
    this.refs = {
      container: container,
      viewer: document.querySelector("#postersViewer"),
      first: container.querySelector("#slider-page-first"),
      interLeft: container.querySelector("#slider-page-interLeft"),
      secondBefore: container.querySelector("#slider-page-secondBefore"),
      firstBefore: container.querySelector("#slider-page-firstBefore"),
      current: container.querySelector("#slider-page-current"),
      firstAfter: container.querySelector("#slider-page-firstAfter"),
      secondAfter: container.querySelector("#slider-page-secondAfter"),
      interRight: container.querySelector("#slider-page-interRight"),
      last: container.querySelector("#slider-page-last"),
    };
  }

  update(num) {
    const total = this.totalPages;
    this.refs.first.textContent = num > 3 ? 1 : null;
    this.refs.interLeft.textContent = num > 3 ? "..." : null;
    this.refs.secondBefore.textContent = num > 2 ? num - 2 : null;
    this.refs.firstBefore.textContent = num > 1 ? num - 1 : null;
    this.refs.current.textContent = num;
    this.refs.firstAfter.textContent = total - num > 0 ? num + 1 : null;
    this.refs.secondAfter.textContent = total - num > 1 ? num + 2 : null;
    this.refs.interRight.textContent = total - num > 3 ? "..." : null;
    this.refs.last.textContent = total - num > 3 ? total : null;
    this.passPageNum(num);
  }

  passPageNum(num) {
    this.fetchApi.getPopular(num).then((movies) => {
      this.refs.viewer.innerHTML = pageViewerTemplate(movies);
      const main__list = document.querySelector(".main__list");
      main__list.addEventListener(
        "click",
        this.handleGalleryClick.bind(movies)
      );
    });
  }

  handleGalleryClick(e) {
    if (e.target.tagName === "UL") {
      return;
    }
    e.preventDefault();
    const imgUrl = e.target.closest("a").querySelector(".main__item-img").src;
    const film = this.filter((moveiObj) => moveiObj.poster_path == imgUrl)[0];

    const slider = document.querySelector('#pageSlider');
    slider.setAttribute('style', 'display:none');

    buildDetails(film);
  }
}
