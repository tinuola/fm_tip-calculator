/* To Do :
- Make sure input value is a number
---- Display error message if it is not
- Don't calculate if bill or people field is empty
---- Display error message if it is
- Change state of reset btn when tip and total amts are displayed
- Refactor event listener function for input fields
- Refactor event listener function for tip fields
*/

console.log('Splitter')

const billInput = document.getElementById('bill-input')
let billValue

const peopleInput = document.getElementById('people-input')
let peopleValue

const tipPercents = document.querySelectorAll('.tip-percent')
const customTipInput = document.getElementById('custom-tip-input')
let customTipValue

const tipAmtDisplay = document.getElementById('tip-amount')
const totalAmtDisplay = document.getElementById('total-amount')

const resetBtn = document.getElementById('reset-btn')

const tips = [5, 10, 15, 20, 25]


// Display percentages from tips array
const displayTipValues = () => {
  tipPercents.forEach((tip,i) => {
    tip.innerHTML = `${tips[i]}%`
  })
}


// Get value from input fields
billInput.addEventListener('change', function(){
  billValue = +this.value
})

peopleInput.addEventListener('change', function(){
  peopleValue = +this.value
})

customTipInput.addEventListener('change', function(){
  customTipValue = +this.value

  let tip = customTipValue / 100

  let tipAmt = billValue * tip

  let totalAmt = (billValue + tipAmt) / peopleValue

  tipAmtDisplay.innerHTML = `$${tipAmt / peopleValue}`

  totalAmtDisplay.innerHTML = `$${totalAmt}`
})


// App calculations
tipPercents.forEach((tip, i) => {
  tip.addEventListener('click', function(){
    // console.log(tips[i])

    let tip = tips[i]/100

    let tipAmt = billValue * tip

    let totalAmt = (billValue + tipAmt) / peopleValue

    // Display tip amount
    tipAmtDisplay.innerHTML = `$${tipAmt / peopleValue}`

    // Display total per person
    totalAmtDisplay.innerHTML = `$${totalAmt}`
  })
})


// Reset calculator
const reset = () =>{
  billInput.value = ''
  peopleInput.value = ''
  customTipInput.value = ''
  tipAmtDisplay.innerHTML = `$0.00`
  totalAmtDisplay.innerHTML = `$0.00`
}


resetBtn.addEventListener('click', reset)

displayTipValues()
