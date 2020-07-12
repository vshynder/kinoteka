import FetchAPI from "./FetchApi";

const search = new FetchAPI();
const errorString = document.querySelector('.js-error-notification')
const homeButton = document.querySelector('.js-home-btn');
const libraryButton = document.querySelector('.js-library-btn');



homeButton.addEventListener('click',() => {});
libraryButton.addEventListener('click',() => {});


function eventMaking () {

    const inputLine = document.querySelector('.js-search-field');
    inputLine.addEventListener('input',
    // _.debounce(
        searchFormInputHandler
        , 500)
        // );
}

function searchFormInputHandler (e) { 
    e.preventDefault(); 
    const value = e.currentTarget.value;
    console.log(value);
    const input = search.getByName(value);
    input.then(d=> inputChecking(d));


};

function inputChecking(input) {
    if (typeof input === 'string'){
        errorString.textContent = input;
    } else     if (typeof input === 'object'){
        errorString.textContent = '';
    }
}
eventMaking(); 

