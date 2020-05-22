// When page loads, the first name input field is in focus.
document.getElementById("name").focus();
// Selection of all necessary HTML elements.
const inputOther = document.getElementById("other-title");
const selectOption = document.getElementById("title");
const selectDesign = document.getElementById("design");
const shirtColor = document.getElementById("color");
const colorJsPuns = document.getElementById("colors-js-puns");
const activities = document.querySelector(".activities");
const activitiesInputs = activities.querySelectorAll("input");
let paymentsOption = document.querySelector("#payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("mail");
const inputs = creditCard.querySelectorAll("div input");
const form = document.querySelector("form");
// Create element label.
const label = document.createElement("label");
// Global variable errorMessages is used to store errors if they exist from input fields, when exist the form will not submitting the page.
let errorMessages = [];
// Global variable total is used for the activities to store the current amount, when the activities are checked.
let total = 0;
// Hide the input field id='other-title'.
inputOther.style.display = "none";
// Add eventListener to the select element, when the option Other is changed then the input field id='other-title' is visible or hide on the page.
selectOption.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    inputOther.style.display = "";
  } else {
    inputOther.style.display = "none";
  }
});

// Hide the div id='colors-js-puns' and option textContent Select Theme.
colorJsPuns.hidden = true;
selectDesign.firstElementChild.hidden = true;
// The select element id='color' store his children to the colorOptions variable.
const colorOptions = shirtColor.children;
// Loop over the variable colorOptions children and hide them.
for (let i = 0; i < colorOptions.length; i++) {
  colorOptions[i].hidden = true;
}
// Add eventListener to the select element id='design', each theme calls the function showShirtColors and pass them the parameters for the filtering process.
selectDesign.addEventListener("change", (e) => {
  if (e.target.value === "js puns") {
    showShirtColors("JS Puns", 0);
  } else if (e.target.value === "heart js") {
    showShirtColors("JS shirt", 3);
  } else {
    colorJsPuns.hidden = true;
  }
});
// The function showShirtColors accepts two arguments to filter the required children to show the right colors from the selected theme.
const showShirtColors = (name, select) => {
  for (let i = 0; i < colorOptions.length; i++) {
    if (colorOptions[i].textContent.includes(name)) {
      colorOptions[i].hidden = false;
    } else {
      colorOptions[i].hidden = true;
    }
  }
  colorOptions[select].selected = true;
  colorJsPuns.hidden = false;
};

/**
 * Loop over the activities inputs and add eventListeners to all inputs with the event change.
 * The event target attributes store to his variables, checkboxChecked - dataCost - dataDay - name.
 */
for (let i = 0; i < activitiesInputs.length; i++) {
  activitiesInputs[i].addEventListener("change", (e) => {
    const checkboxChecked = e.target.checked;
    const dataCost = e.target.attributes.getNamedItem("data-cost");
    const dataDay = e.target.attributes.getNamedItem("data-day-and-time");
    const name = e.target.attributes.getNamedItem("name");
    calculateActivities(checkboxChecked, dataCost, dataDay, name);
  });
}
/**
 * In the function when the checkbox is true, the total should is calculated and displays on the page.
 * And when the checkbox is false, te total should is subtracted and displays on the page, when total=0 the total cost label is hidden.
 */
const calculateActivities = (checkboxChecked, dataCost, dataDay, name) => {
  if (checkboxChecked) {
    total += parseInt(dataCost.textContent);
    calcCost(total);
    if (name.textContent !== "all") {
      calcDay(dataDay, name);
    }
  } else {
    if (name.textContent !== "all") {
      for (let i = 1; i < activitiesInputs.length; i++) {
        if (
          dataDay.textContent ===
          activitiesInputs[i].attributes.getNamedItem("data-day-and-time")
            .textContent
        ) {
          activitiesInputs[i].removeAttribute("disabled");
        }
      }
    }
    total -= parseInt(dataCost.textContent);
    calcCost(total);
    if (total === 0) {
      activities.removeChild(label);
    }
  }
};
// calCost function display the total cost on the page.
const calcCost = (total) => {
  label.textContent = `Total: $${total}`;
  activities.appendChild(label);
};
// calcDay function filters all workshops and if there are matches with the same day and date they element is disabled.
const calcDay = (dataDay, name) => {
  for (let i = 1; i < activitiesInputs.length; i++) {
    if (name !== activitiesInputs[i].attributes.getNamedItem("name")) {
      if (
        dataDay.textContent ===
        activitiesInputs[i].attributes.getNamedItem("data-day-and-time")
          .textContent
      ) {
        activitiesInputs[i].setAttribute("disabled", "");
      }
    }
  }
};

// When page is loaded the paypal div and bitcoin div element are hidden, as well as the Select Payment Method option.
const options = paymentsOption.children;
paypal.hidden = true;
bitcoin.hidden = true;
options[0].remove();
/**
 * Add eventLister on the select element id='payment' with the event change.
 * Using switch statement to show or hide the elements.
 */
paymentsOption.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "credit card":
      paypal.hidden = true;
      bitcoin.hidden = true;
      creditCard.hidden = false;
      break;
    case "paypal":
      paypal.hidden = false;
      bitcoin.hidden = true;
      creditCard.hidden = true;
      break;
    case "bitcoin":
      paypal.hidden = true;
      bitcoin.hidden = false;
      creditCard.hidden = true;
      break;
  }
});
// Function nameInputValidation test the name input value.
const nameInputValidation = () => {
  // Regular expression, can only contain letters a-z in lowercase
  const regex = /^[a-z]+$/;
  // Variable message contains a error message when the condition is false.
  const message = "Please add your name";
  const previousEl = nameInput.previousElementSibling.textContent;
  // If input value matches the regular expression and when the input value is not zero. Adding style to the border and remove the error message if exist.
  if (regex.test(nameInput.value) && nameInput.value.length > 0) {
    nameInput.style.border = "3px solid #7dce94";
    if (previousEl === message) {
      nameInput.previousElementSibling.remove();
    }
  } else {
    // When condition is false adding style to border red and create a label element to show the error message. Inserting the label before the input element.
    nameInput.style.border = "2px solid red";
    if (previousEl === "Name:") {
      const el = document.createElement("label");
      el.textContent = message;
      el.style.color = "red";
      nameInput.parentNode.insertBefore(el, nameInput);
    }
    // Adding the error message to the global variable.
    errorMessages.push(previousEl);
  }
};
// Function mailInputValidation test the mail input value.
const mailInputValidation = () => {
  // Regular expression, must be a valid email address
  const regex = /^[^@]+@[^@.]+\.[a-z]+$/i;
  // Variable message contains a error message when the condition is false.
  const message = "Please enter a valid email address";
  /**
   * validSignAt - the position of the first occurrence of the At sign
   * validSignDot - the position of the last occurrence of the Dot sign
   */
  const validSignAt = emailInput.value.indexOf("@");
  const validSignDot = emailInput.value.lastIndexOf(".");
  const previousEl = emailInput.previousElementSibling.textContent;
  // If input value matches the regular expression and when the input value is not zero. Adding style to the border and remove the error message if exist.
  if (
    regex.test(emailInput.value) &&
    validSignAt > 0 &&
    validSignDot > validSignAt
  ) {
    emailInput.style.border = "3px solid #7dce94";
    if (previousEl === message) {
      emailInput.previousElementSibling.remove();
    }
  } else {
    // When condition is false adding style to border red and create a label element to show the error message. Inserting the label before the input element.
    emailInput.style.border = "2px solid red";
    if (previousEl === "Email:") {
      const el = document.createElement("label");
      el.textContent = message;
      el.style.color = "red";
      emailInput.parentNode.insertBefore(el, emailInput);
    }
    // Adding the error message to the global variable.
    errorMessages.push(previousEl);
  }
};
// Function checkboxInputValidation tests checkboxes are clicked.
const checkboxInputValidation = () => {
  // Variable ifChecked stores the checkboxes boolean.
  let ifChecked = [];
  // The for loop is looping over the inputs checkboxes and stores the boolean true in the array ifChecked.
  for (let i = 0; i < activitiesInputs.length; i++) {
    if (activitiesInputs[i].checked) {
      ifChecked.push(!activitiesInputs[i].checked);
    }
  }
  // If the array ifChecked length is zero add the color style to the legend element textContent.
  if (ifChecked.length === 0) {
    activities.firstElementChild.innerHTML =
      "Please choose at lest one activities";
    activities.firstElementChild.style.color = "red";
    errorMessages.push(activities.firstElementChild.textContent);
    // If the array ifChecked length is greater than zero - when a checkbox is checked, add the color style to inherit.
  } else if (ifChecked.length > 0) {
    activities.firstElementChild.innerHTML = "Register for Activities";
    activities.firstElementChild.style.color = "inherit";
  }
};
// Check for Credit Card Validation
const checkCreditCard = () => {
  const regex = /^\d{13,16}$/;
  createErrorMsg(0, regex);
};
// Check for Zip Code Validation
const checkZipCode = () => {
  const regex = /^\d{5}$/;
  createErrorMsg(1, regex);
};
// Check for CVV Code Validation
const checkCvvCode = () => {
  const regex = /^\d{3}$/;
  createErrorMsg(2, regex);
};
// Checks for validation and print the error messages
const createErrorMsg = (el, regex) => {
  // The cvvMessage array stores the error messages for the case something is entered but not matched in the input field.
  const cvvMessage = [
    "Numbers must be between 13 and 16 numbers.",
    "The zip code must be 5 numbers long.",
    "The CVV number must contain 3 numbers.",
  ];
  // The blankMessage array stores the error messages for input fields when the fields are empty.
  const blankMessage = [
    "Please enter a credit card number.",
    "Please enter your Zip Code.",
    "Please enter your CVV number.",
  ];
  let nextEl = inputs[el].nextElementSibling;
  if (regex.test(inputs[el].value)) {
    inputs[el].style.border = "3px solid #7dce94";
    // If the next element from the input field exist, element remove.
    if (nextEl) {
      nextEl.remove();
    }
  } else {
    if (nextEl) {
      nextEl.remove();
    }
    // If input is empty call printMsg function with the appropriate message
    if (inputs[el].value === "") {
      printMsg(el, blankMessage[el]);
      errorMessages.push(blankMessage[el]);
    } else {
      // If input is not empty but still not valid call printMsg function with the appropriate message
      printMsg(el, cvvMessage[el]);
      errorMessages.push(cvvMessage[el]);
    }
  }
};
// Add the styles, create the element for error message and add to the page
const printMsg = (position, message) => {
  inputs[position].style.border = "2px solid red";
  if (!inputs[position].nextElementSibling) {
    const el = document.createElement("label");
    el.textContent = message;
    el.style.color = "red";
    inputs[position].parentNode.appendChild(el);
  }
};

// Setting the eventListeners for the validation.
nameInput.addEventListener("keyup", nameInputValidation);
emailInput.addEventListener("keyup", mailInputValidation);

for (let i = 0; i < activitiesInputs.length; i++) {
  activitiesInputs[i].addEventListener("click", checkboxInputValidation);
}

inputs[0].addEventListener("keyup", checkCreditCard);
inputs[1].addEventListener("keyup", checkZipCode);
inputs[2].addEventListener("keyup", checkCvvCode);

// Adding eventListener to the form.
form.addEventListener("submit", (e) => {
  // Clear the error message array
  errorMessages = [];
  // Cancels the event if it is cancelable.
  e.preventDefault();
  // Calling the functions to check for validation.
  nameInputValidation();
  mailInputValidation();
  checkboxInputValidation();
  // If the credit card is hidden, the validation for credit card will not called.
  if (!creditCard.attributes.hidden) {
    checkCreditCard();
    checkZipCode();
    checkCvvCode();
  }
  // If no error messages ar in the global array errorMessages, page will be refreshed.
  if (errorMessages.length === 0) {
    window.location.reload(true);
    return false;
  }
});
