let billValue;
let peopleValue;
let currentTip;

const billInput = document.querySelector('#bill-input');
const peopleInput = document.querySelector('#people-input');
const customTipInput = document.querySelector('#custom-tip');

const tipPercents = document.querySelectorAll('.tip-percent');

const errorMsgs = document.querySelectorAll('.display-error p');

const tipAmtDisplay = document.querySelector('#tip-amount-display');
const totalAmtDisplay = document.querySelector('#total-amount-display');

const resetBtn = document.querySelector('#reset-btn');

const floatRegex = /^[+]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/;
// const intRegex = /^\d*$/;
const intRegex = /^[0-9]*$/;

const errorMsgsList = {
  1: 'Enter a valid and positive number',
  2: "Can't be zero or empty",
  3: 'Enter a valid, positive, whole number',
  4: 'Must be at least $1.00',
};

/*
*****************
EVENT LISTENERS 
******************
*/

billInput.addEventListener('input', function (e) {
  let value = Number(this.value);
  let position = this.getAttribute('data-input');

  // validateInput(this, value, position);

  let isNum = floatRegex.test(value);

  // validateInput( isNum, value, position )

  if (!isNum) {
    showErrorMsg(this, position, 1);
  } else if (value > 0 && value < 1) {
    showErrorMsg(this, position, 4);
  } else if (Number(value) === 0) {
    showErrorMsg(this, position, 2);
  } else if (value > 1) {
    removeErrorMsg(this, position);
    billValue = value;
    calculateTip();
    // console.log(billValue);
  }
});

customTipInput.addEventListener('input', function (e) {
  let value = Number(this.value);
  let position = this.getAttribute('data-input');

  let isNum = floatRegex.test(value);

  if (!isNum) {
    showErrorMsg(this, position, 1);
    currentTip = 0;
    resetResults();
  } else if (value > 0 && value < 1) {
    showErrorMsg(this, position, 4);
    currentTip = 0;
    resetResults();
  } else if (Number(value) === 0) {
    showErrorMsg(this, position, 2);
    currentTip = 0;
    resetResults();
  } else if (value > 1) {
    removeErrorMsg(this, position);
    currentTip = value;
    calculateTip();
    // console.log(currentTip);
  }
});

peopleInput.addEventListener('input', function (e) {
  let value = Number(this.value);
  let position = this.getAttribute('data-input');

  let isNum = intRegex.test(value);

  if (!isNum) {
    showErrorMsg(this, position, 3);
  } else if (Number(value) === 0) {
    showErrorMsg(this, position, 2);
  } else if (value >= 1) {
    removeErrorMsg(this, position);
    peopleValue = value;
    calculateTip();
    // console.log(peopleValue);
  }
});

// document.addEventListener('input', function (e) {
//   let input = e.target;
//   let inputValue = Number(input.value);
//   let inputIndex = input.getAttribute('data-input');

//   if (input.matches('.input-num-field')) {
//     validateInput(input, inputValue, inputIndex);
//   }
// });

// document.addEventListener('change', function (e) {
//   let input = e.target;
//   let inputValue = Number(input.value);
//   let inputIndex = input.getAttribute('data-input');

//   if (input.matches('.input-num-field')) {
//     if (inputIndex === '1' || inputIndex === '2') {
//       validateMoreThanDollar(input, inputValue, inputIndex);
//     } else {
//       validateWholeNum(input, inputValue, inputIndex);
//     }
//   }
// });

// Designated "click" events
document.addEventListener('click', function (e) {
  let elem = e.target;

  if (elem.matches('.tip-percent')) {
    customTipInput.value = '';
    let tipValue = elem.getAttribute('data-tip-amount');
    currentTip = Number(tipValue / 100);
    calculateTip();
  }

  if (elem.matches('#custom-tip')) {
    resetTipBtns();
  }

  if (elem.matches('#reset-btn')) {
    resetApp();
  }
});

/*
*****************
FUNCTIONS 
******************
*/

// function validateInput(inputElem, inputVal, inputIdx) {
//   let isNum = floatRegex.test(inputVal);

//   if (!isNum) {
//     showErrorMsg(inputElem, inputIdx, 1);
//   } else {
//     removeErrorMsg(inputElem, inputIdx);
// switch (inputIdx) {
//   case '1':
//     billValue = inputVal;
//     break;
//   case '2':
//     currentTip = inputVal;
//     break;
//   case '3':
//     peopleValue = inputVal;
//     break;
// }
// calculateTip(currentTip);
//   }
// }

// function validateWholeNum(inputElem, inputVal, inputIdx) {
//   let isWhole = intRegex.test(inputVal);
//   if (!isWhole || inputVal === NaN) {
//     console.log(inputVal);
//     showErrorMsg(inputElem, inputIdx, 3);
//     peopleValue = 0;
//   } else {
//     removeErrorMsg(inputElem, inputIdx);
//   }
// }

// function validateMoreThanDollar(inputElem, inputVal, inputIdx) {
//   if (inputVal < 1) {
//     showErrorMsg(inputElem, inputIdx, 4);
//     billValue = 0;
//     currentTip = 0;
//   } else {
//     removeErrorMsg(inputElem, inputIdx);
//   }
// }

function showErrorMsg(inputElem, inputFieldNum, msgNum) {
  // Subtract 1 to match field position to errorMsg array indices
  errorMsgs[inputFieldNum - 1].innerHTML = errorMsgsList[msgNum];
  errorMsgs[inputFieldNum - 1].classList.remove('hide');
  inputElem.classList.add('error');
}

function removeErrorMsg(inputElem, inputFieldNum) {
  // Subtract 1 to match field position to errorMsg array indices
  errorMsgs[inputFieldNum - 1].classList.add('hide');
  inputElem.classList.remove('error');
}

function calculateTip() {
  if (billValue && peopleValue && currentTip) {
    currentTip < 1 ? (tipAmt = billValue * currentTip) : (tipAmt = currentTip);

    let totalAmt = billValue + tipAmt;

    tipAmtDisplay.innerHTML = `$${(tipAmt / peopleValue).toFixed(2)}`;

    totalAmtDisplay.innerHTML = `$${(totalAmt / peopleValue).toFixed(2)}`;

    resetBtn.removeAttribute('disabled');
    resetBtn.classList.add('active');
  } else {
    resetResults();
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
  resetBtn.setAttribute('disabled', '');

  resetTipBtns();
  resetResults();
}
