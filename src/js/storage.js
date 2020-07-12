// storage.js

// Принимает ключ `key` по которому будет произведена выборка, получаем данные из localStorage
const getfilmsData = key => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    console.error('Ошибка получения данных из LS: ', err);
  }
};

// Принимает ключ `key` и значение FilmObj(данные фильма) записываем данные в хранилище

const setfilmsData = (key, filmsObjArr) => {
  try {
    const serializedState = JSON.stringify(filmsObjArr);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Ошибка записи в LS: ', err);
    if (err == QUOTA_EXCEEDED_ERR) {
      alert('Превышен лимит');
    }
  };
};


//функция проверки наличия фильма в LS
function isFilmInLS(key, filmObj){
let filmsData = getfilmsData(key) || [];
const film =  filmsData.find(elem => elem.poster_path === filmObj.poster_path);
   
    if (film) return filmsData.indexOf(film);
    else return false;
  
      
}      
    

// функция добавление фильма передаем ключ - строка просмотренный('watched') или к просмотру('to watch')
//Ожидаемый примерный вид объекта FilmObj на основании API
// filmObj={
  // id: 196,
//   poster_path: 'www.//',
//   release_date: 1979-12-19,
//   genre_ids: ['drama', 'detective'],  
//   title: "Kramer vs. Kramer",
//   vote_average: 7.15
// }
function addToMyLib(key, filmObj) {


// получаем данные из Milib или создаем новый объект, если данные отсутствуют
let filmsData = getfilmsData(key) || [];
  console.log(filmsData);

      // + фильм
      // console.log(filmObj.id);

      if (isFilmInLS(key, filmObj) !==false){
        console.log('ура');
        
      }
else {
console.log('нет');
      filmsData.push(filmObj);
      setfilmsData(key,filmsData);
}
  
}

// содержимое MyLib  - передаем ключ - строка просмотренный('watched') или к просмотру('queue')
function openMyLib(key) {
  // получаем данные из хранилища
  let filmsData = getfilmsData(key);
    
  // формируем данные для вывода
  if (filmsData !== null) {
  // console.log(key);
  // console.log(filmsData);
  
  const array_size = 20;
  
  let sliced_filmsData = [];
  
  for (let i = 0; i < filmsData.length; i += array_size) {
    sliced_filmsData.push(filmsData.slice(i, i + array_size));
  }
  // console.log(sliced_filmsData);
    return sliced_filmsData;
    
  } 
  }


// // очищаем Mylib
// document.getElementById('clear').addEventListener('click', () => {
// localStorage.removeItem(key);
// Mylib.innerHTML = 'сleared';
// });

//Функция удаления фильма из MyLib

function deleteFilm(key, filmObj) {

  const toDelIdx = isFilmInLS(key,filmObj);
// получаем данные из Milib
let filmsData = getfilmsData(key);
    // console.log(filmsData);

    //удаляем из массива фильм
filmsData.splice(toDelIdx,1);
//Чистим LS
localStorage.removeItem(key);

//записываем обновленный массив в LS
setfilmsData(key,filmsData);

}


export { openMyLib, addToMyLib, isFilmInLS, deleteFilm };