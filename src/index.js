import "./styles/styles.scss";
import {
  mainPageSlider
} from "./js/details.js";
import {
  eventMaking
} from "./js/input.js";
import './modalwindow.js'

eventMaking();
mainPageSlider.set(20);
export const header = document.querySelector(".header");
