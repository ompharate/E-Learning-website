const isValidName = (name) => { 
    return String(name).match(/^[a-zA-Z]/)
}

const isValidateEmail = (email) => {
    return String(email).toLowerCase().match(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/);
}
const isValidateExperiance = (number) => {
    if(parseInt(number)<=60 && parseInt(number) >=1){return true;}else{return false;}
}
module.exports = {isValidName,isValidateEmail,isValidateExperiance}