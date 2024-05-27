module.exports.getSentimentScore = (score) => {
    try {
        const number = parseFloat(score)
        if (!isNaN(number) && number >= 0 && number <= 100) return number
        return false
    } catch (error) {
        return false
    }
}

module.exports.getEmailRegex = () => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

module.exports.isValidEmailAddress = (emailAddress) => {
    try {
        if (!emailAddress) return false
        const emailRegex = this.getEmailRegex();
        return String(emailAddress).toLowerCase().match(emailRegex);
    } catch (error) {
        return false
    }
}