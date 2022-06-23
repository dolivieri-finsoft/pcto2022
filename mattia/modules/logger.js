const clc = require("cli-color");

let colors = {
    "INFO": clc.white,
    "WARNING": clc.yellow,
    "ERROR": clc.red.bold,
    "DEBUG": clc.magenta
}

function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
}

class Log {
    constructor() { }

    INFO(msg) {
        let today = new Date();
        let dateTime = today.getDate() + '-' + addZero((today.getMonth() + 1)) + '-' + today.getFullYear() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + addZero(today.getSeconds());
        console.log(dateTime + " [" + colors.INFO(' INFO    ') + "] " + msg);
    }

    WARNING(msg) {
        let today = new Date();
        let dateTime = today.getDate() + '-' + addZero((today.getMonth() + 1)) + '-' + today.getFullYear() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + addZero(today.getSeconds());
        console.log(dateTime + " [" + colors.WARNING(' WARNING ') + "] " + msg);
    }

    ERROR(msg) {
        let today = new Date();
        let dateTime = today.getDate() + '-' + addZero((today.getMonth() + 1)) + '-' + today.getFullYear() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + addZero(today.getSeconds());
        console.log(dateTime + " [" + colors.ERROR(' ERROR   ') + "] " + msg);
    }

    DEBUG(msg) {
        let today = new Date();
        let dateTime = today.getDate() + '-' + addZero((today.getMonth() + 1)) + '-' + today.getFullYear() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + addZero(today.getSeconds());
        console.log(dateTime + " [" + colors.DEBUG(' DEBUG   ') + "] " + msg);
    }
}

const Formatter = (status, msg) => {
    return JSON.stringify({ 'status': status, 'response': msg });
}

module.exports = {
    Log,
    Formatter
};