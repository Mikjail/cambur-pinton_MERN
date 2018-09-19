const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


const validation = {
    validateEmail(email){
        if(!re.test(email)) return 'Email Invalido'
    },
    confirmPass(values){
        if(values['password'] !== values['confirmPass'] ){
           return 'La contraseña debe coincidir';
        }

    }
}
export default validation;