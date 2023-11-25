"use strict";
/**
 Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
 Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
 яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;


/**
 Вам необхідно реалізувати наступний функціонал.
 Зробити валідацію до всіх полів
 1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
 alert "Номер не співпадає" або "Сума не співпадає"

 2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
 Якщо не співпадає то видавати alert "Не вірний паспортний номер"

 3. Номер кредитної карки 16 цифр -
 якщо не співпадає то видавати alert "Не вірна кредитна картка"

 4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

 Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click', payFine);

function findFineByNumber(value) {
  return DB.filter((item) => item.номер === value);
}

function checkPassport(value) {
  return value.match(/[А-Яа-яІЇЄіїє]{2}\d{6}$/gm);
}

function checkCreditCardNumber(value) {
  return value.match(/^\d{16}$/gm);
}

function checkCvv(value) {
  return value.match(/^\d{3}$/gm);
}

function checkFineAmount(value, finesArray) {
  return finesArray[0]['сума'] === Number(value);
}

function makePayment(fine) {
  delete DB[DB.indexOf(fine)];
}

function payFine() {
  let fines = findFineByNumber(fineNumber.value);
  if (fines.length === 0) {
    alert("Номер не співпадає");
    return;
  }
  if (!checkFineAmount(amount.value, fines)) {
    alert("Сума не співпадає");
    return;
  }
  if (!checkPassport(passport.value)) {
    alert("Не вірний паспортний номер");
  }
  if (!checkCreditCardNumber(creditCardNumber.value)) {
    alert("Не вірна кредитна картка");
  }
  if (!checkCvv(cvv.value)) {
    alert("Не вірний cvv");
  }
  makePayment(fines[0]);
}