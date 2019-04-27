'use strict';

const inputNameElement = document.getElementById('insertName');
const inputEmailElement = document.getElementById('insertEmail');
const checkVerifyElement = document.getElementById('checkVerify');
const saveButtonElement = document.querySelector('.button__save');
const userInfoArr = [];



function getInforFromForm() {
  const infoUser = {};// está aqui porque la variable que contiene ese objeto NO PUEDE SER GLOBAL Se crea una nueva y se destruye cada vez que se ejecute la función.
  if (inputNameElement.value !== '') {
    infoUser.name = inputNameElement.value;
    infoUser.confirm = checkVerifyElement.checked;
    infoUser.email = inputEmailElement.value;

    userInfoArr.push(infoUser);

    console.log(userInfoArr);

  }
}


saveButtonElement.addEventListener('click', getInforFromForm);

