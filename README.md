# Interactive Form

## Techdegree project 3

### Descrition of the project

1. In this project I have use Javascript to enhance an interactive registration form for a conference called "Fullstack Conf.".
2. Adding customized and conditional behavior and interactivity.
3. Validating user input and providing helpful error messages when the user enters invalid information into the form fields.

### Overview of the project

#### DOM manipulation and validation of the input fields

1.  Edited css files
2.  Created the required folder and added reset.css file
3.  Added one input element to the HTML
4.  Displaying and hiding the new added input element
5.  Displaying and hiding the color menu when the theme is selected, hide the Select Theme option from the menu
6.  Activities - disabling workshops that matches the selected workshop if they have the same day and time
7.  Calculating the workshop total amount and display to the page, when total amount is zero the element is removed
8.  Set credit card payment option as the default, when the page is loaded only the credit card option is visible
9.  Disabled the 'Select Payment Option' from the payment select menu
10. Depending what is selected in the menu payments, the page displays the selected option on the page
11. Added error messages for name, email, register for activities, credit card, zip code and cvv code inputs
12. The form submits when no errors appears, the errors are added to the global error array in all functions which check the validation of each field
13. Form works without Javascript, when js is not work the user has access to all input fields, all inputs fields are on the page
14. Added two part error messages for the credit card inputs, when inputs are blank and when the inputs not matched the required regular expressions in the functions
15. Added real time error messages to the fields that are required for testing

#### More details

1. When the button "Register" is clicked, the eventListener on the form is fired with the event 'submit'.
2. The callback function calls all the functions for testing validation.
3. The functions validating the inputs with the regular expressions, if the regular expression is not matched with the inputs values, error messages are displayed on the page.
4. The same happens for the real time validation. All inputs have eventListeners with the events "keyup" and "click" and the same functions are called to test validation.
