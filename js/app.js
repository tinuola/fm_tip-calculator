let billValue;
let peopleValue;
let currentTip;

const billInput = document.querySelector('#bill-input');
const peopleInput = document.querySelector('#people-input');
const customTipInput = document.querySelector('#custom-tip-input');

const tipPercents = document.querySelectorAll('.tip-percent');

const inputFields = document.querySelectorAll(`input[type = 'text']`);
const errorMsgs = document.querySelectorAll('.display-error p');

const tipAmtDisplay = document.querySelector('#tip-amount-display');
const totalAmtDisplay = document.querySelector('#total-amount-display');

const resetBtn = document.querySelector('#reset-btn');

const floatRegex = /^[+]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/;
const intRegex = /^[0-9]*$/;

const errorMsgsList = {
  1: 'Enter a valid, positive number',
  2: "Can't be zero or empty",
  3: 'Enter a valid, positive, whole number',
  4: 'Must be at least $1.00',
};

/*
*****************
EVENT LISTENERS 
******************
*/

// Input Fields
billInput.addEventListener('input', function (e) {
  let value = Number(this.value);
  let position = this.getAttribute('data-input');

  let isNum = floatRegex.test(value);

  if (!isNum) {
    showErrorMsg(this, position, 1);
    billValue = 0;
    resetResults();
  } else if (value > 0 && value < 1) {
    showErrorMsg(this, position, 4);
    billValue = 0;
    resetResults();
  } else if (value === 0) {
    showErrorMsg(this, position, 2);
    billValue = 0;
    resetResults();
  } else if (value >= 1) {
    removeErrorMsg(this, position);
    billValue = value;
    calculateTip();
  }
});

customTipInput.addEventListener('input', function (e) {
  resetTipBtns();
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
  } else if (value === 0) {
    showErrorMsg(this, position, 2);
    currentTip = 0;
    resetResults();
  } else if (value >= 1) {
    removeErrorMsg(this, position);
    currentTip = value;
    calculateTip();
  }
});

peopleInput.addEventListener('input', function (e) {
  let value = Number(this.value);
  let position = this.getAttribute('data-input');

  let isNum = intRegex.test(value);

  if (!isNum) {
    showErrorMsg(this, position, 3);
    peopleValue = 0;
    resetResults();
  } else if (value === 0) {
    showErrorMsg(this, position, 2);
    peopleValue = 0;
    resetResults();
  } else if (value >= 1) {
    removeErrorMsg(this, position);
    peopleValue = value;
    calculateTip();
  }
});

// Tip Buttons
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

function showErrorMsg(inputElem, inputFieldNum, msgNum) {
  // Subtract 1 to match field position to errorMsg array indices
  errorMsgs[inputFieldNum - 1].innerHTML = errorMsgsList[msgNum];
  errorMsgs[inputFieldNum - 1].classList.remove('hide-error');
  inputElem.classList.add('error');
}

function removeErrorMsg(inputElem, inputFieldNum) {
  // Subtract 1 to match field position to errorMsg array indices
  errorMsgs[inputFieldNum - 1].classList.add('hide-error');
  inputElem.classList.remove('error');
}

function calculateTip() {
  if (billValue && peopleValue && currentTip) {
    currentTip < 1 ? (tipAmt = billValue * currentTip) : (tipAmt = currentTip);

    let totalAmt = billValue + tipAmt;

    tipAmtDisplay.innerHTML = `$${(tipAmt / peopleValue).toFixed(2)}`;

    totalAmtDisplay.innerHTML = `$${(totalAmt / peopleValue).toFixed(2)}`;

    tipAmtDisplay.classList.add('active');
    totalAmtDisplay.classList.add('active');

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

  tipAmtDisplay.classList.remove('active');
  totalAmtDisplay.classList.remove('active');
}

function resetInputFields() {
  inputFields.forEach((e, i) => {
    e.classList.remove('error');
    errorMsgs[i].classList.add('hide-error');
  });
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

  resetInputFields();
  resetTipBtns();
  resetResults();
}
