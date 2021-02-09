
/* USERNAME VALIDATORS */

let usernameLengthChecker = (username) => {
    console.log("Inside username validator");
    if(!username){
        return false;
    }
    else if(username.length > 3 && username.length < 15){
        return true;
    }
    else{
        return false;
    }
}

let validUsername = (username) => {
    if(!username){
        return false;
    }else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
}

const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: "Length must be between 3 and 15" 
    },
    {
        validator: validUsername,
        message: "The username is not valid"
    }
]

/* EMAIL VALIDATORS */
const emailLengthChecker = (email) => {
    if(!email) return false;
    else if(email.length < 5 || email.length > 30) return false;
    else return true;
  };

const validEmailChecker = (email) => {
if(!email) return false;
else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
}
};
  
const emailValidators = [
{
    validator: emailLengthChecker,
    message: 'E-mail must be at least 5 characters but not more than 30'
},
{
    validator: validEmailChecker,
    message: 'must provide a valid email'
}
]


/* PASSWORD VALIDATORS */

const passwordLengthChecker = (password) => {
    if(!password){
        return false;
    }
    else{
        if(password.length > 5 && password.length <20)
            return true;
        else 
            return false;
    }
}

let validPassword = (password) => {
    if(!password) return false;
    else {
      let regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
      return regExp.test(password);
    }
  }
  
  const passwordValidators = [
    {
      validator: passwordLengthChecker,
      message: 'password must be at least 5 characters long and no more than 15'
    },
    {
      validator: validPassword,
      message: 'password must have at least one uppercase, lowercase, number, and special character'
    }
  ]
  


module.exports =  {
    emailValidators: emailValidators,
    usernameValidators: usernameValidators,
    passwordValidators: passwordValidators
}
