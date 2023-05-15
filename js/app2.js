let billValue;
let peopleValue;
let currentTip;

const billInput = document.querySelector('#bill-input');
const peopleInput = document.querySelector('#people-input');

const tipPercents = document.querySelectorAll('.tip-percent');
const customTipInput = document.querySelector('#custom-tip');

const errorMsgs = document.querySelectorAll('.display-error p');

const tipAmtDisplay = document.querySelector('#tip-amount-display');
const totalAmtDisplay = document.querySelector('#total-amount-display');

const resetBtn = document.querySelector('#reset-btn');

const floatRegex = /^[+]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/;
const intRegex = /^\d*$/;

const errorMsgsList = {
  1: 'Enter a valid number',
  2: "Can't be zero",
  3: 'Must be a whole number',
};

/******************
EVENT LISTENERS 
*******************/

document.addEventListener('input', function (e) {
  let input = e.target;

  if (input.matches('.input-num-field')) {
    let inputValue = Number(input.value);
    let inputIndex = input.getAttribute('data-input');
    // let errorMsg = errorMsgs[inputIndex];
    let isNum = floatRegex.test(inputValue);

    if (!isNum) {
      // errorMsg.innerHTML = errorMsgsList[1];
      // errorMsg.classList.remove('hide');
      // input.classList.add('error');
      showErrorMsg(input, inputIndex, 1);
    } else if (input.value === '0') {
      // errorMsg.innerHTML = errorMsgsList[2];
      // errorMsg.classList.remove('hide');
      // input.classList.add('error');
      showErrorMsg(input, inputIndex, 2);
    } else {
      // errorMsg.classList.add('hide');
      // input.classList.remove('error');
      removeErrorMsg(input, inputIndex);
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

// Designated "click" events
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

// Add validation function

function showErrorMsg(inputElem, inputFieldNum, msgNum) {
  errorMsgs[inputFieldNum].innerHTML = errorMsgsList[msgNum];
  errorMsgs[inputFieldNum].classList.remove('hide');
  inputElem.classList.add('error');
}

function removeErrorMsg(inputElem, inputFieldNum) {
  errorMsgs[inputFieldNum].classList.add('hide');
  inputElem.classList.remove('error');
}

function calculateTip(num) {
  if (billValue && peopleValue && currentTip) {
    let tip = num;

    let tipAmt;

    num < 1 ? (tipAmt = billValue * tip) : (tipAmt = tip);

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
  resetBtn.setAttribute('disabled', '');

  resetTipBtns();
  resetResults();
}
