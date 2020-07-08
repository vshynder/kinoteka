export default class FetchAPI {
  constructor() {
    this.API_KEY = "be244f548a27d8c36fc000d6ba379c12";
    this.noMatchMessage =
      "Search result not successful. Enter the correct movie name and try again";
  }
  async getPopular(page = 1) {
    const popularAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=${page}`;
    const data = await fetch(popularAPI).then((j) => j.json());
    const newData = data.results.map((el) => {
      return {
        poster_path: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
        title: el.title,
        genre: "drama, comedie",
        release_year: el.release_date.split("-")[0],
        vote_average: el.vote_average,
        overwiev: el.overwiev,
        original_title: el.original_title,
        popularity: el.popularity,
        vote_count: el.vote_count,
      };
    });
    return newData;
  }

  async getByName(name) {
    const nameArr = name.split(" ");
    const query = nameArr.length > 1 ? nameArr.join("+") : nameArr[0];
    const getByNameAPI = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${query}`;
    const data = await fetch(getByNameAPI).then((j) => j.json());
    return data.results.length !== 0 ? data.results : this.noMatchMessage;
  }
}
