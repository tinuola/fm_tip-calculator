/*  To Do :
// - Change state of reset btn when tip and total amts are displayed
// - Recalculate when any input is changed, not just tips, so...
// ---- App should keep track of active/current tip value
- Refactor event listener function for input fields
- Change style of current vs unselected tips

BUG: When input field is a non-numerical value, calculation should NOT run
- Create helper function to validate numerical input value 
- Add this to calculate function
*/

const billInput = document.getElementById('bill-input')
const billErrorMsg = document.querySelector('.bill-input-msg')
let billValue 

const peopleInput = document.getElementById('people-input')
const peopleErrorMsg = document.querySelector('.people-input-msg')
let peopleValue

const tipPercents = document.querySelectorAll('.tip-percent')
const customTipInput = document.getElementById('custom-tip-input')
const tipErrorMsg = document.querySelector('.tip-input-msg')
let customTipValue

const tipAmtDisplay = document.getElementById('tip-amount')
const totalAmtDisplay = document.getElementById('total-amount')

const resetBtn = document.getElementById('reset-btn')

const floatRegex = /^[+]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/
const intRegex = /^\d*$/

const tips = [5, 10, 15, 20, 25]
let currentTip // Manages state of current tip


/******************
FUNCTIONS 
*******************/


// Display percentages from tips array
const displayTipValues = () => {
  tipPercents.forEach((tip,i) => {
    tip.innerHTML = `${tips[i]}%`
  })
}
displayTipValues()


// Verify if input field for bill or people is empty
// Used by tip event listeners
const verifyNonEmptyInput = () => {
  billValue = billInput.value
  peopleValue = peopleInput.value
  return (billValue === '' || peopleValue === '')
}


// Calculate values and display final result
const calcShowResults = (num) => {
  let isInputEmpty = verifyNonEmptyInput()

  if(isInputEmpty){
    tipErrorMsg.innerHTML = `Bill or Number of People cannot be empty`
    return null;
  } else {
    billValue = Number(billInput.value)
    peopleValue = Number(peopleInput.value)

    let tip = num/100
    let tipAmt = billValue * tip
    let totalAmt = billValue + tipAmt

    tipAmtDisplay.innerHTML = `$${(tipAmt / peopleValue).toFixed(2)}`
    totalAmtDisplay.innerHTML = `$${(totalAmt / peopleValue).toFixed(2)}`

    tipErrorMsg.innerHTML = ``

    resetBtn.style.backgroundColor = 'green'
  }
}


// Reset calculator
const reset = () =>{
  billInput.value = ''
  peopleInput.value = ''
  customTipInput.value = ''
  tipAmtDisplay.innerHTML = `$0.00`
  totalAmtDisplay.innerHTML = `$0.00`
  resetBtn.style.backgroundColor = 'transparent'
}


/******************
EVENT LISTENERS 
*******************/


// Validate input field for bill
billInput.addEventListener('change', function(){
  billValue = Number(this.value)
  let isNum = floatRegex.test(billValue)

  !isNum ? 
  billErrorMsg.innerHTML = `Please enter a valid number.` 
  : billValue === 0 ? billErrorMsg.innerHTML = `Cannot be a zero` 
  : billErrorMsg.innerHTML = ``

  calcShowResults(currentTip) 
})


// Validate input field for people
peopleInput.addEventListener('change', function(){
  peopleValue = Number(this.value)
  let isNum = intRegex.test(peopleValue)

  !isNum ? peopleErrorMsg.innerHTML = `Please enter a valid number.`  
  : peopleValue === 0 ? peopleErrorMsg.innerHTML = `Cannot be a zero` 
  : peopleErrorMsg.innerHTML = ``

  calcShowResults(currentTip)
})


tipPercents.forEach((tip, i) => {
  tip.addEventListener('click', function(){
    let isInputEmpty = verifyNonEmptyInput()
    currentTip = tips[i]
    tip.style.color = 'tomato'

    isInputEmpty ? 
    tipErrorMsg.innerHTML = `Bill or Number of People cannot be empty` :
    calcShowResults(tips[i])

    customTipInput.value = ``
  })
})


customTipInput.addEventListener('change', function(){
  customTipValue = Number(this.value)
  let isNum = intRegex.test(customTipValue)

  let isInputEmpty = verifyNonEmptyInput()
  currentTip = customTipValue
  customTipInput.style.color = 'tomato'

  !isNum ? tipErrorMsg.innerHTML = `Please enter a valid number.` 
  : isInputEmpty ? tipErrorMsg.innerHTML = `Bill or Number of People cannot be empty`
  : calcShowResults(customTipValue)
})


resetBtn.addEventListener('click', reset)

