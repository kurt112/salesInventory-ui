const pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)


export const CheckPasswordStrength = (text,setError,setMessage,message) => {

    if(!pattern.test(text)){
        setError(true)
        setMessage(message)
        return false
    }


    return true
}
