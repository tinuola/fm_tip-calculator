let billValue;
// let customTipValue;
let peopleValue;
let currentTip; // Store/track current tip value

const customTipInput = document.querySelector('#custom-tip');

const errorMsgs = document.querySelectorAll('.display-error p');

const floatRegex = /^[+]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/;

const errorMsgsList = {
  1: 'Enter a valid number',
  2: "Can't be zero",
  3: 'Must be a whole number',
  4: 'Enter bill amount',
  5: 'Enter number of people',
  6: 'Enter bill amount and number of people',
  7: "Select a tip; don't be cheap!",
};

// Old variables to refactor or delete
const billInput = document.querySelector('#bill-input');
// let billValue;

const peopleInput = document.querySelector('#people-input');
// let peopleValue;

const tipPercents = document.querySelectorAll('.tip-percent');
// const customTipInput = document.querySelector('#custom-tip');
const tipErrorMsg = document.querySelector('.tip-input-msg');
// let customTipValue;

const tipAmtDisplay = document.querySelector('#tip-amount');
const totalAmtDisplay = document.querySelector('#total-amount');

const resetBtn = document.querySelector('#reset-btn');

const intRegex = /^\d*$/;

/******************
EVENT LISTENERS 
*******************/
document.addEventListener('input', function (e) {
  let input = e.target;
  if (input.matches('.input-num-field')) {
    let inputValue = Number(input.value);
    let inputIndex = input.getAttribute('data-input');
    let errorMsg = errorMsgs[inputIndex];
    let isNum = floatRegex.test(inputValue);

    // Make this is a function?
    if (!isNum) {
      errorMsg.innerHTML = errorMsgsList[1];
      errorMsg.classList.remove('hide');
    } else {
      errorMsg.classList.add('hide');
      switch (inputIndex) {
        case '0':
          billValue = inputValue;
          break;
        case '1':
          // customTipValue = inputValue;
          currentTip = inputValue / 100;
          console.log(currentTip);
          // calculateTip()
          break;
        case '2':
          peopleValue = inputValue;
          break;
      }
    }
  }
});

document.addEventListener('click', function (e) {
  let elem = e.target;
  if (elem.matches('.tip-percent')) {
    customTipInput.value = '';
    let tipValue = elem.getAttribute('data-tip-amount');
    currentTip = Number(tipValue / 100);
    calculateTip(); //add para
  }

  if (elem.matches('#custom-tip')) {
    tipPercents.forEach((e) => {
      e.checked = false;
    });
  }
});

/******************
FUNCTIONS 
*******************/

function calculateTip() {
  // Make sure bill value isn't 0 or null
  // Make sure people value isn't 0 or null
  // Display error
  // Or calculate
  // change reset button style
}

/******************
FUNCTIONS 
*******************/

// Display percentages from tips array
// const displayTipValues = () => {
// tipPercents.forEach((tip, i) => {
// tip.innerHTML = `${tips[i]}%`
// tip.value = `${tips[i]}`;
// });
// };
// displayTipValues();

// Verify if input field for bill or people is empty
// Used by tip event listeners
// const verifyNonEmptyInput = () => {
//   billValue = billInput.value;
//   peopleValue = peopleInput.value;
//   return billValue === '' || peopleValue === '';
// };

// Calculate values and display final result
// const calcShowResults = (num) => {
//   let isInputEmpty = verifyNonEmptyInput();

//   if (isInputEmpty) {
//     tipErrorMsg.innerHTML = `Please enter Bill amount and Number of People.`;
//     return null;
//   } else {
//     billValue = Number(billInput.value);
//     peopleValue = Number(peopleInput.value);

//     let tip = num / 100;
//     let tipAmt = billValue * tip;
//     let totalAmt = billValue + tipAmt;

//     tipAmtDisplay.innerHTML = `$${(tipAmt / peopleValue).toFixed(2)}`;
//     totalAmtDisplay.innerHTML = `$${(totalAmt / peopleValue).toFixed(2)}`;

//     tipErrorMsg.innerHTML = ``;

//     resetBtn.style.backgroundColor = 'green';
//   }
// };

// Reset calculator
// const reset = () => {
//   billInput.value = '';
//   peopleInput.value = '';
//   customTipInput.value = '';
//   tipAmtDisplay.innerHTML = `$0.00`;
//   totalAmtDisplay.innerHTML = `$0.00`;
//   resetBtn.style.backgroundColor = 'transparent';
// };

/******************
EVENT LISTENERS 
*******************/

// Validate input field for bill
// billInput.addEventListener('change', function () {
//   billValue = Number(this.value);
//   let isNum = floatRegex.test(billValue);

//   !isNum
//     ? (billErrorMsg.innerHTML = `Please enter a valid number.`)
//     : billValue === 0
//     ? (billErrorMsg.innerHTML = `Cannot be zero`)
//     : (billErrorMsg.innerHTML = ``);

//   calcShowResults(currentTip);
// });

// Validate input field for people
// peopleInput.addEventListener('change', function () {
//   peopleValue = Number(this.value);
//   let isNum = intRegex.test(peopleValue);

//   !isNum
//     ? (peopleErrorMsg.innerHTML = `Please enter a valid number.`)
//     : peopleValue === 0
//     ? (peopleErrorMsg.innerHTML = `Cannot be a zero`)
//     : (peopleErrorMsg.innerHTML = ``);

//   calcShowResults(currentTip);
// });

// tipPercents.forEach((tip, i) => {
//   tip.addEventListener('click', function () {
//     let isInputEmpty = verifyNonEmptyInput();
//     currentTip = tips[i];
//     tip.style.color = 'tomato';

//     isInputEmpty
//       ? (tipErrorMsg.innerHTML = `Bill or Number of People cannot be empty`)
//       : calcShowResults(tips[i]);

//     customTipInput.value = ``;
//   });
// });

// customTipInput.addEventListener('change', function () {
//   customTipValue = Number(this.value);
//   let isNum = intRegex.test(customTipValue);

//   let isInputEmpty = verifyNonEmptyInput();
//   currentTip = customTipValue;
//   customTipInput.style.color = 'tomato';

//   !isNum
//     ? (tipErrorMsg.innerHTML = `Please enter a valid number.`)
//     : isInputEmpty
//     ? (tipErrorMsg.innerHTML = `Bill or Number of People cannot be empty`)
//     : calcShowResults(customTipValue);
// });

// resetBtn.addEventListener('click', reset);
