const form = document.getElementById('sub')
const uname = document.getElementById('name')
const email = document.getElementById('mail')
const password = document.getElementById('pass')
const error = document.getElementById('error')

form.addEventListener('click', (e) => {
  e.preventDefault()
  let errors = []
  
  if(uname){
    errors = signupErrors()
  }
  else{
    errors = loginErrors()
  }

  if(errors.length > 0){
    error.innerText  = errors.join(". ")
  }else{
    window.location.href='index.html'
  }
})

function signupErrors(){
  let errors = []

  if(uname.value === '' || uname.value == null){
    errors.push('Firstname is required')
    uname.parentElement.classList.add('incorrect')
  }
  if(email.value === '' || email.value == null){
    errors.push('Email is required')
    email.parentElement.classList.add('incorrect')
  }
  if(password.value === '' || password.value == null){
    errors.push('Password is required')
    password.parentElement.classList.add('incorrect')
  }
  if(password.value.length < 8){
    errors.push('Password must have at least 8 characters')
    password.parentElement.classList.add('incorrect')
  }
  return errors;
}

function loginErrors(){
  let errors = []

  if(email.value === '' || email.value == null){
    errors.push('Email is required')
    email.parentElement.classList.add('incorrect')
  }
  if(password.value === '' || password.value == null){
    errors.push('Password is required')
    password.parentElement.classList.add('incorrect')
  }
  return errors;
}

const allInputs = [uname, email, password].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error.innerText = ''
    }
  })
});