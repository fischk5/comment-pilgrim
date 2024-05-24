module.exports.getSentimentScore = (score) => {
    try {
        const number = parseFloat(score)
        if (!isNaN(number) && number >= 0 && number <= 100) return number
        return false
    } catch (error) {
        return false
    }
}