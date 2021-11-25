
const passwordState = ({ containNumber,
    containMin,
    containMaj,
    containSpecial }) => {
    console.log(containMin,
        containNumber,
        containMaj,
        containSpecial)
    if (containNumber && !containMin && !containMaj && !containSpecial) return 'onlyNumber';
    if (!containNumber && (containMin || containMaj) && !containSpecial) return 'mixedAlphabets';
    if (containNumber && (containMin || containMaj) && !containSpecial) return 'mixedAlphabetsAndNumbers';
    if (containNumber && (containMin || containMaj) && containSpecial) return 'mixedAlphabetsAndNumbersAndSymbols';
    return 'mixedAlphabets';

}

const generateAdvices = ({
    containNumber,
    containMin,
    containMaj,
    containSpecial,
    passwordLength
}) => {
    const advices = []
    if (!containNumber) advices.push('Votre mot de passe devrait contenir des nombres');
    if (!containMin) advices.push('Votre mot de passe devrait contenir des minuscules');
    if (!containMaj) advices.push('Votre mot de passe devrait contenir des majuscules');
    if (!containSpecial) advices.push('Votre mot de passe devrait contenir des carractères spéciaux');
    if (passwordLength < 8) advices.push('Votre mot de passe devrait contenir au moins 8 carractères');
    return advices
}

function testPassword(password) {

    const containNumber = password.match(/\d/g)
    const containMin = password.match(/[a-z]/g)
    const containMaj = password.match(/[A-Z]/g)
    const containSpecial = password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)


    const state = passwordState({
        containNumber,
        containMin,
        containMaj,
        containSpecial
    })

    const times = require('../assets/constantes')
    const time = times.find(time => time.name === state)
    const crackTime = time.lengths.find(length => length.length > password.length) || time.lengths[time.lengths.length - 1]
    return {
        crackTime, advices: generateAdvices({
            containNumber,
            containMin,
            containMaj,
            containSpecial,
            passwordLength: password.length
        })
    }

}

module.exports = {
    generateAdvices, passwordState, testPassword
}