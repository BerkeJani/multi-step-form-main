
const planPrices = {
    arcade: { monthly: 9, yearly: 90 },
    advanced: { monthly: 12, yearly: 120 },
    pro: { monthly: 5, yearly: 150 }
}
const addOnPrices = {
    onlineService: { monthly: 1, yearly: 10 },
    largerStorage: { monthly: 2, yearly: 20 },
    customizableProfile: { monthly: 2, yearly: 20 }
}

const multiStepForm = document.forms['multi-step-form'];
const formData = {};
let selectedDuration = 'monthly';

let activeFormName = 'form-one';
let previousFormName = '';


function processStepOne() {
    formData['name'] = multiStepForm['name-input'].value;
    formData['email'] = multiStepForm['email-input'].value;
    formData['phoneNumber'] = multiStepForm['phone-number-input'].value;
    console.log(formData);

    changeActiveState('step-one', 'step-two')
    this.activeFormName = 'step-two';
    this.previousFormName = 'step-one';
}

function processStepTwo() {
    const selectedPlan = multiStepForm['plan-options'].value;
    formData['selected-plan'] = selectedPlan
    console.log(formData['selected-plan']);
    console.log('var value', selectedDuration);
    console.log('input value', multiStepForm['is-yearly'].checked);


    changeActiveState('step-two', 'step-three')
    this.activeFormName = 'step-three';
    this.previousFormName = 'step-two';
}

function processStepThree() {
    const addons = [];
    addons['onlineService'] = multiStepForm['addon-onl-serv'].checked;
    addons['largerStorage'] = multiStepForm['addon-larg-stor'].checked;
    addons['customizableProfile'] = multiStepForm['addon-cust-prof'].checked;
    console.log(addons);

    changeActiveState('step-three', 'step-four')
    this.activeFormName = 'step-four';
    this.previousFormName = 'step-three';
}

function processStepFour() {
    changeActiveState('step-four', 'step-five')
    this.activeFormName = 'step-five';
    this.previousFormName = 'step-four';
}

function goBackOneStep() {
    console.log(this.activeFormName, this.previousFormName);
    changeActiveState(activeFormName, previousFormName);
}

function updateDuration() {
    const switchElement = multiStepForm['is-yearly'].checked;
    if (switchElement == false) {
        this.selectedDuration = 'monthly';
    } else {
        this.selectedDuration = 'yearly';
    }
    console.log('after-switch-change:', this.selectedDuration);
    changePrices();
}

function changePrices() {
    console.log(this.selectedDuration);
    const starting = '+$';
    const ending = this.selectedDuration == 'monthly' ? '/mo' : '/yr';
    document.getElementById('price-arcade').innerHTML = starting + planPrices.arcade[this.selectedDuration] + ending;
    document.getElementById('price-advanced').innerHTML = starting + planPrices.advanced[this.selectedDuration] + ending;
    document.getElementById('price-pro').innerHTML = starting + planPrices.pro[this.selectedDuration] + ending;

    document.getElementById('online-service-price').innerHTML = starting + addOnPrices.onlineService[this.selectedDuration] + ending;
    document.getElementById('larger-storage-price').innerHTML = starting + addOnPrices.largerStorage[this.selectedDuration] + ending;
    document.getElementById('customizable-profile-price').innerHTML = starting + addOnPrices.customizableProfile[this.selectedDuration] + ending;


}

function changeActiveState(from, to) {
    const fromElement = document.getElementById(from);
    const toElement = document.getElementById(to);

    fromElement.classList.remove("form-step-active");
    toElement.classList.add("form-step-active");

    document.getElementById("sb-" + from).classList.remove("active-sb-step");
    document.getElementById("sb-" + to).classList.add("active-sb-step");
}

