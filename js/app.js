/* To Do :
- Refactor event listener function for input fields
- Change style of current vs unselected tip elements
- Refactor to create more granular messages

BUG: 
When inputs are non-numerical values, calc should NOT run
When inputs are selected but no tip is selected, calc should not run
Currently displays NaN
- Create helper function to validate numerical input value 
- Add this to calculate function
*/

const billInput = document.querySelector('#bill-input')
const billErrorMsg = document.querySelector('.bill-input-msg')
let billValue 

const peopleInput = document.querySelector('#people-input')
const peopleErrorMsg = document.querySelector('.people-input-msg')
let peopleValue

const tipPercents = document.querySelectorAll('.tip-percent')
const customTipInput = document.querySelector('#custom-tip-input')
const tipErrorMsg = document.querySelector('.tip-input-msg')
let customTipValue

const tipAmtDisplay = document.querySelector('#tip-amount')
const totalAmtDisplay = document.querySelector('#total-amount')

const resetBtn = document.querySelector('#reset-btn')

const floatRegex = /^[+]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/
const intRegex = /^\d*$/

const tips = [5, 10, 15, 20, 25]

let currentTip // Store/track current tip value


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
    tipErrorMsg.innerHTML = `Please enter Bill amount and Number of People.`
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
