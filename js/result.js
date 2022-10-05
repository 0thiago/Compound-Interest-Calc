import toggleMenu from './toggleMenu.js'

toggleMenu()

let showResult = () => {
  const inputDataAndResultJSON = localStorage.getItem('inputDataAndResult') 
  const inputDataAndResult = JSON.parse(inputDataAndResultJSON)

  inputDataAndResult.lengthOfTime = inputDataAndResult.lengthOfTime / 12
  inputDataAndResult.lengthOfTime = inputDataAndResult.lengthOfTime.toString()
  inputDataAndResult.lengthOfTime = inputDataAndResult.lengthOfTime.slice(0, 5)

  let $resultContainerHTML = document.querySelector('#resultContainerHTML')

  let $resultHTML = `
    <h4>In <em>${inputDataAndResult.lengthOfTime}</em> year(s),<br>applying <em>$ ${inputDataAndResult.monthlyValue}</em> monthly,<br> under a <em>${inputDataAndResult.interestRate}</em> interest rate,<br> you will have:<br> <span><em>$ ${inputDataAndResult.result}</em> !</span</h4>
   `
  $resultContainerHTML.innerHTML = $resultHTML 
}

showResult()

const sendResultToUser = {  
  init: function() {
    this.cacheSelector()
    this.bindEvents()
  },

  cacheSelector: function(){
    this.$form = document.querySelector('#sendResultToUser')
    this.$inputEmail = document.querySelector('#inputEmail')
    this.$sendButton = document.querySelector('#sendButton')
    this.$invalidField = document.querySelector('#invalid-field')
  },

  bindEvents: function(){
    const self = this
    this.$sendButton.onclick = self.Events.submit
    this.$form.onsubmit = self.Events.validateEmail.bind(this)
  },

  Events: {
    validateEmail: function(event){
      const self = this
      event.preventDefault()

      self.$hasError = false

      let regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

      if (regexEmail.test(self.$inputEmail.value) == false) {
        self.$hasError = true
        self.$invalidField.innerHTML = ' Invalid E-mail!  '
        self.$inputEmail.classList.add('invalid-input')
      } else {
        self.$invalidField.innerHTML = ''
        self.$inputEmail.classList.remove('invalid-input')
      }

      if (!self.$hasError) {
        alert('The result was sent to you!')
        this.$form.submit()
      }
    }
  }
}
sendResultToUser.init()

