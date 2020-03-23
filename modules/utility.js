function Utility() {
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
}

module.exports = new Utility();
