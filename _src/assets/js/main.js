'use strict';

const inputNameElement = document.getElementById('insertName');
const inputEmailElement = document.getElementById('insertEmail');
const checkVerifyElement = document.getElementById('checkVerify');
const saveButtonElement = document.querySelector('.btn-save');
const showUsersButtonElement = document.querySelector('.btn-show-users');
const resetButtonElement = document.querySelector('.btn-reset');
const listUsersInfo = document.querySelector('.list__users-info');
let userInfoArr = [];///ARRAY VACIO

//PARTE 4 LOCAL STORAGE recuperar al recargar la página

//esta línea solo se ejecutaría si habría datos guardados con anterioridad.
//añadimos un if para comprobar si habia datos en LS  o estaba null
//Queremos rellenar userInfoArr que en inicio es un array vacío
//queremos reoger los datos de LS SOLO SI son distintos de NULL(no había nada)es decir, que había algo
//si una rray es null, no podemos interactuar con el no se puede medir su longitud, ni pusherar nada.
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

    //manda este ítem o dato a la cache llamalo 'info' identificador y su contenido será igual a userInfoArr stringificado en JSON
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

    ///element LI insert Content
    newUserListEl.appendChild(newLiContent);

    ///element UL insert LI
    listUsersInfo.appendChild(newUserListEl);
    ///each LI add Class and attribute
    newUserListEl.setAttribute('class', 'user__item');
    newUserListEl.setAttribute('tabindex', '0');
  
  }
}


showUsersButtonElement.addEventListener('click', showListUsers);

//PARTE 5 añadir un botón que elimine la información de la caché al ser pulsado
//al ser pulsado tambien elimina el contenido de los campos
///selecciono todos los elementos con la clase useer__item que es la perteneciente a los li 
/////recorro todo el array de elementos creados con un li y lo elimino del DOM
function resetLocalStorage() {
  localStorage.removeItem('info');
  inputNameElement.value = '';
  inputEmailElement.value = '';
  const liCreate =  document.querySelectorAll('.user__item');
  for(const elementli of liCreate){
    elementli.remove();
  }

  ///borrar el array de la local storage y ademas la lista que se crea
}

resetButtonElement.addEventListener('click', resetLocalStorage);