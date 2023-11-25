const elemType = document.getElementById("elem-type");
const elemColor = document.getElementById("elem-color");
const elemWidth = document.getElementById("elem-width");
const elemHeight = document.getElementById("elem-heigh");
const elemText = document.getElementById("elem-text");
const fontColor = document.getElementById("font-color");
const EFontSize = document.getElementById("font-size-num");
const container = document.querySelector(".container");


const borderRadius1 = document.getElementById("border-radius");
const borderStyle1 = document.getElementById("border-type");
const borderColor1 = document.getElementById("border-color");
const borderWidth1 = document.getElementById("border-size");




function addElem() {
  let elem = document.createElement(`${elemType.value}`);
  elem.classList.add("builedElements");
  elem.style.backgroundColor = elemColor.value;
  elem.style.width = elemWidth.value + "px";
  elem.style.height = elemHeight.value + "px";
  elem.innerText = elemText.value;
  elem.style.color = fontColor.value;
  elem.style.fontSize = EFontSize.value + "px";

 //shadow
  const shadowColor = document.getElementById("shadow-color").value;
  const shadowForX = document.getElementById("shadow-x").value;
  const shadowForY = document.getElementById("shadow-y").value;
  const blurRadius = document.getElementById("shadow-blur").value;
  elem.style.boxShadow = `${shadowForX}px ${shadowForY}px ${blurRadius}px ${shadowColor}`;

  if ((shadowForX || shadowForY) && blurRadius < 5) {
    alert("טשטוש חייב להיות מינימום 5");
    return; // Prevent element creation if validation fails
  }
    
  elem.style.borderRadius = borderRadius1.value + "px";
  elem.style.borderStyle = borderStyle1.value;
  elem.style.borderColor = borderColor1.value;
  elem.style.borderWidth = borderWidth1.value + "px";
  // Limit borderWidth and borderRadius to a maximum of 50px
  if (borderWidth1.value > 50) {
    alert("מסגרת עבה מדי");
    container.removeChild(elem);
  }

  if (borderRadius1.value > 50) {
    alert("עיגול גדול מדי");
    container.removeChild(elem);
  }

  container.appendChild(elem);
}





const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearContainer);

function clearContainer() {
  const container = document.querySelector(".container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);

  }
}



function saveElem() {
  const container = document.querySelector(".container");
  const elements = container.getElementsByClassName("builedElements");

  const elementData = [];
   let idCounter = 0;

  for (const element of elements) {
    const elementInfo = {
      id: `${idCounter}`,
      type: element.tagName.toLowerCase(),
      backgroundColor: element.style.backgroundColor,
      width: element.style.width,
      height: element.style.height,
      text: element.innerText,
      color: element.style.color,
      fontSize: element.style.fontSize,
    };

    elementData.push(elementInfo);
    idCounter++;

  }

  alert ("שמירה בוצעה בהצלחה!")

  localStorage.setItem("allElements", JSON.stringify(elementData));
}




function loadElementsFromLocalStorage() {
  const container = document.querySelector(".container");
  const elementDataString = localStorage.getItem("allElements");

  if (elementDataString) {
    const elementData = JSON.parse(elementDataString);

    for (const data of elementData) {
      const elem = document.createElement(data.type);
      elem.classList.add("builedElements");
      elem.style.backgroundColor = data.backgroundColor;
      elem.style.width = data.width;
      elem.style.height = data.height;
      elem.innerText = data.text;
      elem.style.color = data.color;
      elem.style.fontSize = data.fontSize;

      container.appendChild(elem);
    }
  }
}


loadElementsFromLocalStorage();



