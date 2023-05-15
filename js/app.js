let billValue;
let peopleValue;
let currentTip;

const customTipInput = document.querySelector('#custom-tip');

const errorMsgs = document.querySelectorAll('.display-error p');

const tipAmtDisplay = document.querySelector('#tip-amount-display');

const totalAmtDisplay = document.querySelector('#total-amount-display');

const resetBtn = document.querySelector('#reset-btn');

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
    // console.log(typeofinput.value);
    // Make this is a function?
    if (!isNum) {
      errorMsg.innerHTML = errorMsgsList[1];
      errorMsg.classList.remove('hide');
    } else if (inputValue === 0) {
      console.log(inputValue);
      errorMsg.innerHTML = errorMsgsList[2];
      errorMsg.classList.remove('hide');
    } else {
      errorMsg.classList.add('hide');
      switch (inputIndex) {
        case '0':
          billValue = inputValue;
          break;
        case '1':
          currentTip = inputValue;
          break;
        case '2':
          peopleValue = inputValue;
          break;
      }
      calculateTip(currentTip);
    }
  }
});

document.addEventListener('click', function (e) {
  let elem = e.target;

  if (elem.matches('.tip-percent')) {
    customTipInput.value = '';
    let tipValue = elem.getAttribute('data-tip-amount');
    currentTip = Number(tipValue / 100);
    calculateTip(currentTip);
  }

  if (elem.matches('#custom-tip')) {
    resetTipBtns();
  }

  if (elem.matches('#reset-btn')) {
    resetApp();
  }
});

/******************
FUNCTIONS 
*******************/

function calculateTip(num) {
  // Make sure bill value isn't 0 or null
  // Make sure people value isn't 0 or null
  // Display error

  if (billValue && peopleValue && currentTip) {
    let tip = num;
    let tipAmt;
    if (num < 1) {
      tipAmt = billValue * tip;
    } else {
      tipAmt = tip;
    }

    let totalAmt = billValue + tipAmt;

    tipAmtDisplay.innerHTML = `$${(tipAmt / peopleValue).toFixed(2)}`;

    totalAmtDisplay.innerHTML = `$${(totalAmt / peopleValue).toFixed(2)}`;

    resetBtn.removeAttribute('disabled');
    resetBtn.classList.add('active');
  }
}

function resetTipBtns() {
  tipPercents.forEach((e) => {
    e.checked = false;
  });
}

function resetResults() {
  tipAmtDisplay.innerHTML = `$0.00`;
  totalAmtDisplay.innerHTML = `$0.00`;
}

function resetApp() {
  billValue = 0;
  peopleValue = 0;
  currentTip = 0;

  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';

  resetBtn.classList.remove('active');
  resetBtn.setAttribute('disabled');

  resetTipBtns();
  resetResults();
}

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
