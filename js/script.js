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
options[0].style.display = "none";
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
  // Regular expression must be the first 5 characters of the lowercase letter, after that another 15 characters which can be lowercase letters or numbers.
  const regex = /^[a-z]{5}[a-z0-9.]{0,15}$/;
  // Variable message contains a error message when the condition is false.
  const message =
    "Please add your name between 5-20 characters, the first five must be a letter.";
  const previousEl = nameInput.previousElementSibling.textContent;
  // If input value matches the regular expression and when the input value is not zero. Adding style to the border and remove the error message if exist.
  if (regex.test(nameInput.value) && nameInput.value.length > 0) {
    nameInput.style.border = "2px solid white";
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
  /**
   * Regular expression must be the first 5 characters of the lowercase letter,
   * after that another 20 characters which can be lowercase letters or numbers,
   * a at sign,
   * after that lowercase letters that go from zero or 10 characters,
   * a dot sign,
   * and followed with domain names
   */
  const regex = /^[a-z]{5}[a-z0-9]{0,20}@[a-z]{0,10}\.(com|org|net|int|edu|gov|mil)$/;
  // Variable message contains a error message when the condition is false.
  const message =
    "Please enter a valid email address, the first five characters must be a letter.";
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
    emailInput.style.border = "2px solid white";
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
      ifChecked.push(activitiesInputs[i].checked);
      console.log(ifChecked);
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
  }
};
// Function checkCreditCardValidation tests the inputs for validation.
const checkCreditCardValidation = (element, fromForm) => {
  // The position variable is created to store the target position which needs to be tested for the validation.
  let position = 0;
  /**
   * The switch statement stores the number to the position variable from the element argument.
   * The element argument is send from the function realTimeValidation that comes from the input eventListener with the event keyup.
   * When the event keyup is fired, the realTimeValidation functions is called.
   * In this function a if statement is running, when e.target.id matches inputs id, this checkCreditCardValidation function is called with the parameter e.target.id.
   * In this case the element argument is the id from input that was clicked.
   */
  switch (element) {
    case "cc-num":
      position = 0;
      break;
    case "zip":
      position = 1;
      break;
    case "cvv":
      position = 2;
      break;
  }
  /**
   * The regex array variable stores the regular expression for each input.
   * regex[0] - only numbers between 13 - 16 digit
   * regex-[1] - only numbers 5 digit
   * regex[2] - only numbers 3 digit
   */
  const regex = [/^\d{13,16}$/, /^\d{5}$/, /^\d{3}$/];
  // The cvvMessage array stores the error messages for the case something is entered in the input field.
  const cvvMessage = [
    "Numbers must be between 13 and 16 numbers.",
    "The zip code must be 5 numbers long.",
    "The CVV number must contain 3 numbers.",
  ];
  // The blankMessage array stores the error messages for input fields if empty.
  const blankMessage = [
    "Please enter a credit card number.",
    "Please enter your Zip Code.",
    "Please enter your CVV number.",
  ];
  // nextEl variable store the next element from the input field.
  let nextEl = inputs[position].nextElementSibling;
  // The if condition test the input value with the regex test.
  if (regex[position].test(inputs[position].value)) {
    inputs[position].style.border = "2px solid white";
    // If the next element from the input field exist, element remove.
    if (nextEl) {
      nextEl.remove();
    }
  } else {
    // If regex test is false the else statement is running.
    // If the next element from the input field exist, element remove.
    if (nextEl) {
      nextEl.remove();
    }
    /**
     * The fromForm parameter is send from the function checkCreditCardValidation(e.target.id, true), that is called from the form when is submitted.
     * If the condition is true that means the form is submitted.
     * Print the error messages to all inputs depending on whether the field is empty or not.
     */
    if (fromForm) {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
          printMsg(i, blankMessage[i]);
          errorMessages.push(blankMessage[i]);
        } else {
          printMsg(i, cvvMessage[i]);
          errorMessages.push(cvvMessage[i]);
        }
      }
    } else {
      // This else statement handles the eventListeners for the real time error messages.
      if (inputs[position].value === "") {
        printMsg(position, blankMessage[position]);
        errorMessages.push(blankMessage[position]);
      } else {
        printMsg(position, cvvMessage[position]);
        errorMessages.push(cvvMessage[position]);
      }
    }
  }
  // Function printMsg is used to print the error messages that coming from the form when is submitted or the real time eventListers with the keyup event.
  function printMsg(position, message) {
    inputs[position].style.border = "2px solid red";
    if (!inputs[position].nextElementSibling) {
      const el = document.createElement("label");
      el.textContent = message;
      el.style.color = "red";
      inputs[position].parentNode.appendChild(el);
    }
  }
};
/**
 * Function realTimeValidation is called from the eventListeners that is fired.
 * A simple if condition checks the e.target.attributes and call the appropriate function.
 */
const realTimeValidation = (e) => {
  if (e.target.id === "name") {
    nameInputValidation();
  } else if (e.target.id === "mail") {
    mailInputValidation();
  } else if (e.target.type === "checkbox") {
    checkboxInputValidation();
  } else if (
    e.target.id === "cc-num" ||
    e.target.id === "zip" ||
    e.target.id === "cvv"
  ) {
    checkCreditCardValidation(e.target.id);
  }
  // Clear the error message array
  errorMessages = [];
};
// Setting the eventListeners for the validation.
nameInput.addEventListener("keyup", realTimeValidation);
emailInput.addEventListener("keyup", realTimeValidation);
activities.addEventListener("click", realTimeValidation);

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", realTimeValidation);
}
// Adding eventListener to the form.
form.addEventListener("submit", (e) => {
  // Cancels the event if it is cancelable.
  e.preventDefault();
  // Calling the functions to check for validation.
  nameInputValidation();
  mailInputValidation();
  checkboxInputValidation();
  // If the credit card is hidden, the validation for credit card will not called.
  if (!creditCard.attributes.hidden) {
    checkCreditCardValidation(e.target.id, true);
  }
  // If no error messages ar in the global array errorMessages, page will be refreshed.
  if (errorMessages.length === 0) {
    window.location.reload();
  }
  // Clear the error message array
  errorMessages = [];
});
