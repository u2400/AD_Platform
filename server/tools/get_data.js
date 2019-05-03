module.exports = function() {
    let time = new Date();
    return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}-${time.toString().substring(16,24)}`;
}