function toggleMenu() {

  let closeMenuButton = document.querySelector('#closeMenuButton')
  let showMenuButton = document.querySelector('#showMenuButton')
  let menu = document.querySelector('#menuContainer')
  let onfocusedBody = document.querySelector('#onfocusedBody')

  onfocusedBody.onclick = () => {
    menu.classList.remove('show')
  }

  showMenuButton.onclick = () => {
    menu.classList.add('show')
  }

  closeMenuButton.onclick = () => {
    menu.classList.remove('show')
  }
}

toggleMenu()

const calculateCompoundInterest = {

  init: function () {
    this.cacheSelectors()
    this.bindEvents()
  },

  displayLoading: function () {
    this.$loadingBar.style.display = "flex";
  },

  hideLoading: function () {
    this.$loadingBar.style.display = "none";
  },

  cacheSelectors: function () {

    this.$form = document.querySelector('#form')
    this.$inputMonthlyValue = document.querySelector('#inputMonthlyContribution')
    this.$inputInterestRate = document.querySelector('#inputInterestRate')
    this.$inputLengthOfTime = document.querySelector('#lengthOfTime')
    this.$calculateButton = document.querySelector('#calculateButton')
    this.$resetButton = document.querySelector('#resetButton')
    this.$formula = ''
    this.$finalValue = ''
    this.$resultBoxHTML = document.querySelector('#resultBoxHTML')
    this.$loadingBar = document.querySelector('#loadingBar')

  },

  convertFromJSON: function (response) {
    return response.json()

  },

  calcResult: function (response) {

    console.log(response)

    if (response.result === 'Infinity') {
      alert('This value is too high to be calculated. Please try again')
      return false
    }

    if (response.result.includes('e')) {

      let digit = parseInt(response.result.slice(-1)) + 4
      let value = response.result.slice(0, digit)

      this.$finalValue = value.replace('.', '')

      this.$finalValue = this.$finalValue.substring(0, this.$finalValue.length - 2) + '.' + this.$finalValue.substring(this.$finalValue.length - 2, this.$finalValue.length)

      console.log(this.$finalValue)

    } else {
      this.$finalValue = response.result.substr(0, response.result.indexOf('.') + 3);
    }    

    const inputDataAndResult = {
      monthlyValue: this.$inputMonthlyValue.value,
      interestRate: this.$inputInterestRate.value,
      lengthOfTime: this.$inputLengthOfTime.value,
      result: this.$finalValue
    }
    
    const inputDataAndResultJSON = JSON.stringify(inputDataAndResult)

    

    localStorage.setItem('inputDataAndResult', inputDataAndResultJSON)

    this.$form.submit()
    this.displayLoading()

  },

  showError: function () {
    console.log('showError - Error')
  },

  postInputData: function () {

    let headers = {
      method: 'POST',
      body: `{"expr":"${this.$formula}"}`,
      headers: { 'Content-Type': 'application/json' }
    }

    fetch('https://api.mathjs.org/v4/', headers)
      .then(this.convertFromJSON)
      .then(this.calcResult.bind(this))
      .catch(this.showError.bind(this))
  },

  bindEvents: function () {
    const self = this

    this.$resetButton.onclick = self.Events.resetForm.bind(this)

    this.$calculateButton.onclick = self.Events.validateData.bind(this)

    this.$inputMonthlyValue.onkeydown = self.Events.acceptOnlyNumber.bind(this)
    this.$inputInterestRate.onkeydown = self.Events.acceptOnlyNumber.bind(this)
    this.$inputLengthOfTime.onkeydown = self.Events.acceptOnlyNumber.bind(this)
  },

  Events: {

    resetForm: function (event) {
      event.preventDefault()
      this.$inputMonthlyValue.value = ''
      this.$inputInterestRate.value = ''
      this.$inputLengthOfTime.value = ''
    },

    validateData: function (event) {
      event.preventDefault()

      let hasError = false

      let monthlyValue = this.$inputMonthlyValue.value
      let interestRate = this.$inputInterestRate.value
      let lengthTime = this.$inputLengthOfTime.value

      
      this.$formula = `${monthlyValue} * (((1 + ${interestRate}) ^ ${lengthTime} -1) / ${interestRate})`


      if (this.$inputMonthlyValue.value == '') {
        hasError = true
        this.$form.previousElementSibling.innerText = `Some fields are invalid`
        this.$inputMonthlyValue.classList.add('invalid-input')
      } else {
        this.$form.previousElementSibling.innerText = ''
        this.$inputMonthlyValue.classList.remove('invalid-input')
      }

      if (this.$inputInterestRate.value == '') {
        hasError = true
        this.$form.previousElementSibling.innerText = `Some fields are invalid`
        this.$inputInterestRate.classList.add('invalid-input')
      } else {
        this.$form.previousElementSibling.innerText = ''
        this.$inputInterestRate.classList.remove('invalid-input')
      }

      if (this.$inputLengthOfTime.value == '') {
        hasError = true
        this.$form.previousElementSibling.innerText = `Some fields are invalid`
        this.$inputLengthOfTime.classList.add('invalid-input')
      } else {
        this.$form.previousElementSibling.innerText = ''
        this.$inputLengthOfTime.classList.remove('invalid-input')
      }

      if (!hasError) {
        this.postInputData()
      }
    },

    acceptOnlyNumber: function (event) {
      if (isNaN(event.key) === true && event.key !== 'Backspace' && event.key !== "Tab" && event.key !== "." || event.keyCode === 32) {
        return false
      }
    },
  }
}

calculateCompoundInterest.init()