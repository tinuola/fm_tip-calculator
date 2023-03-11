/*  To Do :
// - Make sure input value is a number
// ---- Display error message if it is not
// - Don't calculate if bill or people field is empty
// ---- Display error message if it is
// - Refactor event listener function for tip fields
- Change state of reset btn when tip and total amts are displayed
- Refactor event listener function for input fields
- Recalculate when any input is changed, not just tips, so...
---- App should keep track of active/current tip value
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


// FUNCTIONS //

// Display percentages from tips array
const displayTipValues = () => {
  tipPercents.forEach((tip,i) => {
    tip.innerHTML = `${tips[i]}%`
  })
}
displayTipValues()


// Verify if input field for Bill or People is empty
// Used by tip event listeners
const verifyNonEmptyInput = () => {
  billValue = billInput.value
  peopleValue = peopleInput.value
  return (billValue === '' || peopleValue === '')
}


// Calculate bill and display final result
// Used by tip event listeners
const calcAndDisplay = (num) => {
  billValue = Number(billInput.value)
  peopleValue = Number(peopleInput.value)

  let tip = num/100
  let tipAmt = billValue * tip
  let totalAmt = billValue + tipAmt

  tipAmtDisplay.innerHTML = `$${tipAmt / peopleValue}`
  totalAmtDisplay.innerHTML = `$${totalAmt / peopleValue}`

  tipErrorMsg.innerHTML = ``
}


// Reset calculator
const reset = () =>{
  billInput.value = ''
  peopleInput.value = ''
  customTipInput.value = ''
  tipAmtDisplay.innerHTML = `$0.00`
  totalAmtDisplay.innerHTML = `$0.00`
}


// EVENT LISTENERS //

// Validate Bill input field
billInput.addEventListener('change', function(){
  billValue = Number(this.value)
  let isNum = floatRegex.test(billValue)
  tipErrorMsg.innerHTML = ``

  !isNum ? 
  billErrorMsg.innerHTML = `Please enter a valid number.` : 
  billErrorMsg.innerHTML = ``
})

// Validate People input field
peopleInput.addEventListener('change', function(){
  peopleValue = Number(this.value)
  let isNum = intRegex.test(peopleValue)
  tipErrorMsg.innerHTML = ``

  !isNum ? peopleErrorMsg.innerHTML = `Please enter a valid number.`  
  : peopleValue === 0 ? peopleErrorMsg.innerHTML = `Cannot be a zero` 
  : peopleErrorMsg.innerHTML = ``
})


tipPercents.forEach((tip, i) => {
  tip.addEventListener('click', function(){
    let isInputEmpty = verifyNonEmptyInput()

    isInputEmpty ? 
    tipErrorMsg.innerHTML = `Bill or Number of People cannot be empty` :
    calcAndDisplay(tips[i])
  })
})


customTipInput.addEventListener('change', function(){
  customTipValue = Number(this.value)
  let isNum = intRegex.test(customTipValue)
  let isInputEmpty = verifyNonEmptyInput()

  !isNum ? tipErrorMsg.innerHTML = `Please enter a valid number.` 
  : isInputEmpty ? tipErrorMsg.innerHTML = `Bill or Number of People cannot be empty`
  : calcAndDisplay(customTipValue)
})

resetBtn.addEventListener('click', reset)

