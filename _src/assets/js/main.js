'use strict';

const inputNameElement = document.getElementById('insertName');
const inputEmailElement = document.getElementById('insertEmail');
const checkVerifyElement = document.getElementById('checkVerify');
const saveButtonElement = document.querySelector('.button__save');
const showUsersButtonElement = document.querySelector('.button__show-users');
const resetButtonElement = document.querySelector('.button__reset');
const listUsersInfo = document.querySelector('.list__users-info');
let userInfoArr = [];///ARRAY VACIO

//PARTE 4 LOCAL STORAGE recuperar al recargar la página

//esta línea solo se ejecutaría si habría datos guardados con anterioridad.
//añadimis un if para comprobar si habia datos en LS  o estaba null
// Queremos rellenar userinfoarr que en inicio es un array vacío
//queremos reoger los datos de LS SOLO SI son distintos de NULL(no habia nada)  es decir, que había algo
//s una rray es null, no podemos interactuar con el no se puede medir su longitud, nu pusherar nada ni nada de nada 
if (localStorage.getItem('info') !== null) {
  userInfoArr = JSON.parse(localStorage.getItem('info'));
}


///PARTE1

function getInforFromForm() {
  const infoUser = {};// está aquí porque la variable que contiene ese objeto NO PUEDE SER GLOBAL Se crea una nueva y se destruye cada vez que se ejecute la función. nuevo/'borra'/nuevo/borra
  if (inputNameElement.value !== '') {
    infoUser.name = inputNameElement.value;
    infoUser.confirm = checkVerifyElement.checked;
    infoUser.email = inputEmailElement.value;

    userInfoArr.push(infoUser);

    console.log(userInfoArr);

    //PARTE 4 LOCAL STORAGE persistencia en caché
    localStorage.setItem('info', JSON.stringify(userInfoArr));

    //manda este ítem o datox  a la cache llamalo 'info' identificador y su contenido será igual a userInfoArr stringificado en JSON

  }
}

saveButtonElement.addEventListener('click', getInforFromForm);

//PARTE 2

function showListUsers() {
  let namesList;///DECLARO las variables que contendran la información solicitada FUERA del Bucle
  let checkList;
  let emailList;
  let newLiContent;// contenido de LI nuevo que voy a crear

  listUsersInfo.innerHTML = ''; // pone el contenido del UL a cero cada vez que se introduce un dato nuevo

  for (let i = 0; i < userInfoArr.length; i++) {//RELLENO las VARIABLES DENTRO DEL BUCLE CON EL RECORRIDO
    namesList = userInfoArr[i].name;
    checkList = userInfoArr[i].confirm;
    emailList = userInfoArr[i].email;

    //Crear el elemento nuevo
    const newUserListEl = document.createElement('li');

    //Inserto el contenido dependiendo de las condiciones que se cumplen excepto el NOMBRE que se introduce SIEMPRE

    if (checkList === true) {
      newLiContent = document.createTextNode(namesList + ' ' + emailList);//COMPONER UN STRING
    }
    else {
      newLiContent = document.createTextNode(namesList);
    }

    ///AL LI LE PONGO EL CONTENIDO
    newUserListEl.appendChild(newLiContent);
    ///AL UL LE INSERTO EL LI
    listUsersInfo.appendChild(newUserListEl);

  }
}


showUsersButtonElement.addEventListener('click', showListUsers);

//PARTE 5 añadir un botón que elimine la información de la caché al ser pulsado

function resetLocalStorage() {
  localStorage.removeItem('info');

}


resetButtonElement.addEventListener('click', resetLocalStorage);
