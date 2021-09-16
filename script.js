function $(name) {return document.getElementById(name)}

var billAmount = 0;
var tipPercentage = 0;
var numberOfPeople = 0;
var tipsArray = [5, 10, 15, 25, 50] //same as ID name



//TIP BUTTONS FUNCTIONS
//Tip button event listeners
for (let i = 0; i < tipsArray.length; i++) {
  $(tipsArray[i]).onclick = () => {
    tipPercentage = tipsArray[i]/100;
    removeActiveClass();
    $(tipsArray[i]).classList.add("active");
    $("customTip").value = "";
    checkIfcompleted();
  }
}

//Custom tip
$("customTip").oninput = () => {
  tipPercentage = $("customTip").value;
  removeActiveClass();
  $("customTip").classList.add("active");
  checkIfcompleted();
}

function removeActiveClass () {
  var elements = document.getElementsByClassName('active');
  while(elements.length > 0){
    elements[0].classList.remove('active');
  }
}

//RESET BUTTON FUNCTIONS
function activateResetButton() {
    $("resetButton").classList.remove("grayout");
    $("resetButton").addEventListener("click", resetEverything)
}

//Reset button press
function resetEverything() {
  $("resetButton").classList.add("grayout");
  $("resetButton").removeAttribute("onclick");
  $("bill").value = "";
  $("customTip").value = "";
  $("numOfPeople").value = "";
  $("tipPerPerson").innerHTML = "$ 0.00";
  $("billPerPerson").innerHTML = "$ 0.00";
  billAmount = 0;
  tipPercentage = 0;
  numberOfPeople = 0;
}



//FORM FIELDS
$("bill").oninput = () => {
    billAmount = $("bill").value;
    checkIfcompleted();
}

$("numOfPeople").oninput = () => {
    numberOfPeople = $("numOfPeople").value;
    checkIfcompleted();
}

$("numOfPeople").oninput = () => {
    numberOfPeople = $("numOfPeople").value;
    checkIfcompleted();
}

//CHECK IF COMPLETED
function checkIfcompleted() {
  if (billAmount > 0 && numberOfPeople > 0 && tipPercentage != "") {
    calculate();
    activateResetButton();
  }
}

//CALCULATE
function calculate() {
  var tipPerPerson = (billAmount * tipPercentage)/numberOfPeople;
  var billPerPerson = billAmount/numberOfPeople + tipPerPerson;

  $('tipPerPerson').innerHTML = "$ " +  (tipPerPerson).toFixed(2);
  $('billPerPerson').innerHTML = "$ " + (billPerPerson).toFixed(2);
}

//FILTER INPUTS (respect maxlength attribute of number fields)
var elements = document.querySelectorAll("[type='number']");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("input", filterInputs);
}

function filterInputs() {
  inputElement = this;
  maxNumberLength(inputElement);
  removeNoneNumeric(inputElement)
}

function maxNumberLength(inputElement) {
  if (inputElement.value.length > inputElement.getAttribute("maxlength")) {
    inputElement.value = inputElement.value.slice(0, inputElement.maxLength);
  }
}

function removeNoneNumeric() {
  if (inputElement.which < 48 || inputElement.which > 57)
    {
        inputElement.preventDefault();
    }
}