export default class FetchAPI {
  constructor() {
    this.API_KEY = "be244f548a27d8c36fc000d6ba379c12";
    this.noMatchMessage =
      "Search result not successful. Enter the correct movie name and try again";
  }

  async getGenres() {
    const genrseFetch =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=be244f548a27d8c36fc000d6ba379c12&language=en-US";
    const genres = await fetch(genrseFetch).then((j) => j.json());
    return genres;
  }

  async getPopular(page = 1) {
    const popularAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=${page}`;
    const data = await fetch(popularAPI).then((j) => j.json());
    return this.getDataObject(data);
  }

  async getByName(name) {
    const nameArr = name.split(" ");
    const query = nameArr.length > 1 ? nameArr.join("+") : nameArr[0];
    const getByNameAPI = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${query}`;
    const data = await fetch(getByNameAPI).then((j) => j.json());
    if (data.results.length === 0) {
      return this.noMatchMessage;
    } else {
      return this.getDataObject(data);
    }
  }

  async getDataObject(data) {
    const awaitGenres = await this.getGenres();
    const genres = awaitGenres.genres;
    const newData = data.results
      .map((el) => {
        return {
          poster_path: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
          title: el.title,
          genre: el.genre_ids.reduce((acc, id) => {
            const filmGenre = genres.filter((genre) => genre.id === id)[0];
            acc.push(filmGenre.name);
            return acc.slice(0, 3);
          }, []),
          release_year: el.release_date.split("-")[0],
          vote_average: el.vote_average,
          overview: el.overview,
          original_title: el.original_title,
          popularity: el.popularity,
          vote_count: el.vote_count,
          id: el.id,
        };
      })
      .filter((el) => !el.poster_path.includes("null"));
    return newData;
  }
}
