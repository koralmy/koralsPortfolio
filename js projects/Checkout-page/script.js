const holderName = document.querySelector("#name");
const cardNumbers = document.querySelector("#cardNumber");
const expiryDate = document.querySelector("#expiry");
const cvcNum = document.querySelector("#cvc");
const discountNum = document.querySelector(".discount");

holderName.addEventListener("keypress", function (Latters) {
  if ((Latters.which < 96 || Latters.which > 123) && Latters.which != 32) {
    Latters.preventDefault();
  }
});




cardNumbers.addEventListener("input", function (e) {
  e.target.value = e.target.value
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();

  const card = cardNumbers.value;

  let visaRegex = new RegExp("^4 || '' ");
  if (card.match(visaRegex) != null) {
    cardNumbers.style.backgroundImage = "url('./img/visa2.png')";
  }

  let americanRegex = new RegExp("^6011");
  if (card.match(americanRegex) != null) {
    cardNumbers.style.backgroundImage = "url('./img/american-expres.png')";
  }

  let masterCard = new RegExp("^5[1-5]");
  if (card.match(masterCard) != null) {
    cardNumbers.style.backgroundImage = "url('./img/visa.png')";
  }
});

expiryDate.addEventListener("keypress", function (e) {
  e.target.value = e.target.value
    .replace(
      /^([1-9]\/|[2-9])$/g,
      "0$1/" // 3 > 03/
    )
    .replace(
      /^(0[1-9]|1[0-2])$/g,
      "$1/" // 11 > 11/
    )
    .replace(
      /^([0-1])([3-9])$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
      "$1/$2" // 141 > 01/41
    )
    .replace(
      /^([0]+)\/|[0]+$/g,
      "0" // 0/ > 0 and 00 > 0
    )
    .replace(
      /[^\d\/]|^[\/]*$/g,
      "" // To allow only digits and `/`
    )
    .replace(
      /\/\//g,
      "/" // Prevent entering more than 1 `/`
    );
});

function nameCardHolderValid() {
  if (holderName.value.length > 4 && holderName.value.match(/^[a-zA-Z ]*$/)) {
    holderName.style.borderBottomColor = "#9563ff";
    return true;
  } else {
    holderName.style.borderBottomColor = "red";
    return false;
  }
}

function cardNumbersValid() {
  if (
    cardNumbers.value.length > 19 ||
    cardNumbers.value == null ||
    cardNumbers.value == undefined ||
    cardNumbers.value == ""
  ) {
    cardNumbers.style.borderBottomColor = "red";
    return false;
  } else if (cardNumbers.value.length === 19) {
    cardNumbers.style.borderBottomColor = "#9563ff";

    return true;
  }
}

const today = new Date();
const today_mm = today.getMonth() + 1;
const today_yy = today.getFullYear() % 100;

function cardExpValid() {
  const mm = expiryDate.value.substring(0, 2);
  const yy = expiryDate.value.substring(3);

  if (
    yy > today_yy ||
    (yy == today_yy && mm >= today_mm && expiryDate.value.length == 5)
  ) {
    expiryDate.style.borderBottomColor = "#9563ff";
    return true;
  } else if (
    (yy == today_yy && mm >= today_mm) ||
    expiryDate.value == "" ||
    expiryDate.value == null
  ) {
    expiryDate.style.borderBottomColor = "red";
    return false;
  }
}

function cardCvcValid() {
  if (cvcNum.value.length == 3 || cvcNum.value.length == 4) {
    cvcNum.style.borderBottomColor = "#9563ff";
    return true;
  } else if (
    cvcNum.value.length < 3 ||
    cvcNum.value.length == null ||
    cvcNum.value == ""
  ) {
    cvcNum.style.borderBottomColor = "red";
    return false;
  }
}

const btn = document.getElementById("btn");

function discountCode() {
  const discountNum = document.querySelector(".discount");
  const discountArray = discountNum.value.split("-");

  const firstRegex = /^[A-Z]{8}$/;
  const secondRegex = /^[0-9]{2}$/;
  const thirdRegex = /^[A-Z]{3}$/;

  let test1 = firstRegex.test(discountArray[0]);
  let test2 = secondRegex.test(discountArray[1]);
  let test3 = thirdRegex.test(discountArray[2]);

  if (!test1 || !test2 || !test3) {
    discountNum.style.borderBottomColor = "red";
    if (discountNum.value == "") {
      discountNum.style.borderBottomColor = "#9563ff";
    }
  } else {
    discountNum.style.borderBottomColor = "#9563ff";
    return true;
  }
}

btn.disabled = true;

function validationsFunction(e) {
  e.preventDefault();
 

  if (
    nameCardHolderValid() &&
    cardNumbersValid() &&
    cardExpValid() &&
    cardCvcValid()
  ) {
    btn.disabled = false;
    btn.style.cursor = "pointer";
  } else {
    btn.disabled = true;
  }
  if (discountCode()) {
    discountNum.style.borderBottomColor = "#9563ff";
    document.querySelector(".apply-btn").style.display = "block";
  } else {
    document.querySelector(".apply-btn").style.display = "none";
  }
}


// window.location.href = "sucssec.html";


holderName.addEventListener("keyup", validationsFunction);
cardNumbers.addEventListener("keyup", validationsFunction);
expiryDate.addEventListener("keyup", validationsFunction);
cvcNum.addEventListener("keyup", validationsFunction);
discountNum.addEventListener("keyup", validationsFunction);
