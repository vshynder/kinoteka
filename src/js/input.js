import FetchAPI from "./FetchApi";

const search = new FetchAPI();

function eventMaking () {

    const inputLine = document.querySelector('.js-search-field');
    inputLine.addEventListener('input', searchFormInputHandler);

}

function searchFormInputHandler (e) { 
    e.preventDefault(); 
    const value = e.currentTarget.value;
    console.log(value);
    const input = search.getByName(value);
    input.then(d=>console.log(d));
};
eventMaking();

