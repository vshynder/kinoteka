export default class FetchAPI {
  constructor() {
    this.API_KEY = "be244f548a27d8c36fc000d6ba379c12";
    this.noMatchMessage =
      "Search result not successful. Enter the correct movie name and try again";
  }
  async getPopular(amountOfPages = 1) {
    const outArr = [];
    for (let i = 1; i <= amountOfPages; i++) {
      const popularAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=${i}`;
      const data = await fetch(popularAPI).then((j) => j.json());
      outArr.push(...data.results);
    }
    return outArr;
  }

  async getByName(name) {
    const nameArr = name.split(" ");
    const query = nameArr.length > 1 ? nameArr.join("+") : nameArr[0];
    const getByNameAPI = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${query}`;
    const data = await fetch(getByNameAPI).then((j) => j.json());
    return data.results.length !== 0 ? data.results : this.noMatchMessage;
  }
}
