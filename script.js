

const myForm = document.getElementById("form-id");

const nameRegex =/^(([A-Za-zא-ת]+[\-\']?)*([A-Za-zא-ת]+)?\s)+([A-Za-zא-ת]+[\-\']?)*([A-Za-zא-ת]+)?$/;

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

myForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = myForm.elements["Name"];
  const emailInput = myForm.elements["email"];


  

  if (!nameRegex.test(nameInput.value)) {
    alert("name not ok");
    return


  } else if (!emailRegex.test(emailInput.value)) {
    alert("mail not ok");
    return;
  }

  myForm.submit();
});



