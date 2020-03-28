const fs = require('fs');

function Utility() {
    this.initServer = function() {
        if (!fs.existsSync('./data')) fs.mkdir('./data', function() { console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[42;37m'} Server ${'\033[40;33m'} mkdir '/data'${'\033'}[0m`); });
        if (!fs.existsSync('./public/image/temp')) fs.mkdir('./public/image/temp', function() { console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[42;37m'} Server ${'\033[40;33m'} mkdir '/public/image/temp'${'\033'}[0m`); });
    };

    this.getClientIP = function(req) {
        return req.ip || req.headers['x-real-ip'] || req.headers['x-forward-for'] || req.connection.remoteAddress || req.socket.remoteAddress || '';
    };

    this.getLocaleDate = function() {
        let date = new Date();
        return this.formatDate(date, 'YYYY/MM/DD hh:mm:ss.uuu');
    };

    this.formatDate = function(date, format_str) {
        return format_str
        .replace(/Y+/, date.getFullYear())
        .replace(/M+/, this.addPlaceholderZero(date.getMonth() + 1, 2))
        .replace(/D+/, this.addPlaceholderZero(date.getDay(), 2))
        .replace(/h+/, this.addPlaceholderZero(date.getHours(), 2))
        .replace(/m+/, this.addPlaceholderZero(date.getMinutes(), 2))
        .replace(/s+/, this.addPlaceholderZero(date.getSeconds(), 2))
        .replace(/u+/, this.addPlaceholderZero(date.getMilliseconds(), 3));
    };

    this.addPlaceholderZero = function(value, length) {
        return (Array(length + 1).join('0') + value.toString()).slice(-length);
    };

    this.getFileList = function(data, path = 'data') {
        data.push({ path: path, file: path.split('/').slice(-1)[0] });
        if (fs.statSync(path).isFile()) return;
        let files = fs.readdirSync(path);
        for (file of files) {
            this.getFileList(data, path + '/' + file);
        }
    };
}

module.exports = new Utility();
