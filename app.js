const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');
const gm = require('gm');
const uuid = require('uuid');
const marked = require('marked');
const highlightjs = require('highlight.js');
const filetype = require('./modules/file-type');
const constant = require('./modules/const');
const utility = require('./modules/utility');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    codePrefix: 'hljs',
    tableClass: 'table',
    highlight: function(code, lang) {
        return highlightjs.highlightAuto(code, [lang]).value;
    }
});

app.use(express.static('./public'));
app.use(express.static('./node_modules/mdui/dist'));
app.use(express.static('./node_modules/highlight.js'));
app.use(express.static('./node_modules/mathjax/es5'));

app.get(/^.+@raw$/, function(req, res) {
    let ip = utility.getClientIP(req);
    let path = decodeURI(req.url).slice(0, -4);
    console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} ${ip} → Server ${'\033[40;32m'} request ${'\033[40;35m'}'${path}${'\033[40;32m'}@raw${'\033[40;35m'}'${'\033'}[0m`);
    if (!fs.existsSync('data' + path)) {
        res.status(404).send('<center><h1>404 Not Found</h1><center><hr>');
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;31m'}[404 Not Found]`)
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
        return;
    }
    if (!fs.statSync('data' + path).isFile()) {
        res.status(404).send('<center><h1>404 Not Found</h1><center><hr>');
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;31m'}[404 Not Found]`)
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
        return;
    }
    res.header('Content-Type', 'text/plain; charset=UTF-8');
    fs.readFile('data' + path, function(err, data) {
        if (err) return;
        res.send(data);
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;35m'}'${path}${'\033[40;32m'}@raw${'\033[40;35m'}'${'\033'}[0m`);
    });
});

app.get(/^.+@hl$/, function(req, res) {
    let ip = utility.getClientIP(req);
    let path = decodeURI(req.url).slice(0, -3);
    console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} ${ip} → Server ${'\033[40;32m'} request ${'\033[40;35m'}'${path}${'\033[40;32m'}@hl${'\033[40;35m'}'${'\033'}[0m`);
    if (!fs.existsSync('data' + path)) {
        res.status(404).send('<center><h1>404 Not Found</h1><center><hr>');
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;31m'}[404 Not Found]`)
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
        return;
    }
    if (!fs.statSync('data' + path).isFile()) {
        res.status(404).send('<center><h1>404 Not Found</h1><center><hr>');
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;31m'}[404 Not Found]`)
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
        return;
    }
    fs.readFile('data' + path, function(err, data) {
        if (err) return;
        let code = data.toString(), lang = filetype.getFileType(path);
        res.send(`<link rel="stylesheet" href="/styles/atom-one-light.css"><pre><code class="language-${lang}">${highlightjs.highlightAuto(code, [lang]).value}</code></pre>`);
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;35m'}'${path}${'\033[40;32m'}@hl${'\033[40;35m'}'${'\033'}[0m`);
    });
});

app.get(/^.+\.md$/, function(req, res, next) {
    let ip = utility.getClientIP(req);
    let path = decodeURI(req.url);
    console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} ${ip} → Server ${'\033[40;32m'} request ${'\033[40;35m'}'${path}'${'\033'}[0m`);
    if (!fs.existsSync('data' + path)) {
        res.status(404).send('<center><h1>404 Not Found</h1><center><hr>');
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;31m'}[404 Not Found]`)
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
        return;
    }
    if (!fs.statSync('data' + path).isFile()) {
        next();
        return;
    }
    fs.readFile('data' + path, function(err, data) {
        if (err) return;
        res.send('<link rel="stylesheet" href="/styles/atom-one-light.css"><script src="/tex-mml-chtml.js" async></script>' + marked(data.toString().replace(/(?<!\\)\$(.*?[^\\])\$/g, '\\\\($1\\\\)').replace(/\\[\(\)]\$/g, '$$$$')));
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;35m'}'${path}'${'\033'}[0m`);
    });
});

app.get(RegExp(`^.+\\.(${constant.langs.join('|')})$`), function(req, res) {
    let ip = utility.getClientIP(req);
    let path = decodeURI(req.url);
    console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} ${ip} → Server ${'\033[40;32m'} request ${'\033[40;35m'}'${path}${'\033[40;32m'}@hl${'\033[40;35m'}'${'\033'}[0m`);
    if (!fs.existsSync('data' + path)) {
        res.status(404).send('<center><h1>404 Not Found</h1><center><hr>');
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;31m'}[404 Not Found]`)
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
        return;
    }
    if (!fs.statSync('data' + path).isFile()) {
        res.status(404).send('<center><h1>404 Not Found</h1><center><hr>');
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;31m'}[404 Not Found]`)
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
        return;
    }
    fs.readFile('data' + path, function(err, data) {
        if (err) return;
        let code = data.toString(), lang = filetype.getFileType(path);
        res.send(`<link rel="stylesheet" href="/styles/atom-one-light.css"><pre><code class="language-${lang}">${highlightjs.highlightAuto(code, [lang]).value}</code></pre>`);
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;35m'}'${path}${'\033[40;32m'}@hl${'\033[40;35m'}'${'\033'}[0m`);
    });
});

app.use(express.static('./data'));

app.get('/api/change-view-mode', function(req, res) {
    let ip = utility.getClientIP(req);
    console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} ${ip} → Server ${'\033[45;37m'} API ${'\033[40;32m'} request ${'\033[40;35m'}'change view mode'${'\033'}[0m`);
    if (!req.session.view_mode) {
        res.redirect('/');
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;32m'} redirect ${'\033[40;35m'}'/'${'\033'}[0m`);
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
        return;
    }
    if (req.session.view_mode == 'view_list') req.session.view_mode = 'view_module';
    else req.session.view_mode = 'view_list';
    res.end();
    console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} ${ip} ${'\033[45;37m'} API ${'\033[40;32m'} change view mode${'\033'}[0m`);
});

app.get('/api/small-image', function(req, res) {
    let ip = utility.getClientIP(req);
    let path = req.query.path;
    console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} ${ip} → Server ${'\033[45;37m'} API ${'\033[40;32m'} request ${'\033[40;35m'}'${path}${'\033[40;32m'}@small${'\033[40;35m'}'${'\033'}[0m`);
    if (!path) {
        res.status(400).send('<center><h1>400 Bad Request</h1><center><hr>');
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;31m'}[400 Bad Request]${'\033'}[0m`);
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
        return;
    }
    if (!fs.existsSync('data' + path)) {
        res.status(404).send('<center><h1>404 Not Found</h1><center><hr>');
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;31m'}[404 Not Found]${'\033'}[0m`);
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
        return;
    }
    let uid = uuid.v1();
    gm('./data' + path).resize(200).setFormat('JPEG').quality(70).strip().autoOrient().write(`./public/image/temp/${uid}.jpg`, function(err) {
        if (err) {
            console.log(err);
            res.status(406).send('<center><h1>406 Not Acceptable</h1><center><hr>');
            console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;31m'}[406 Not Acceptable]${'\033'}[0m`);
            console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
            return;
        }
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[42;37m'} Server ${'\033[40;33m'} create '/temp/${uid}.jpg'${'\033'}[0m`);
        res.sendFile(__dirname + `/public/image/temp/${uid}.jpg`, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} Server → ${ip} ${'\033[45;37m'} API ${'\033[40;32m'} send ${'\033[40;35m'}'/temp/${uid}.jpg' ${'\033[40;32m'}as ${'\033[40;35m'}'${path}${'\033[40;32m'}@small${'\033[40;35m'}'${'\033'}[0m`);
            fs.unlinkSync(`./public/image/temp/${uid}.jpg`);
            console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[42;37m'} Server ${'\033[40;33m'} delete '/temp/${uid}.jpg'${'\033'}[0m`);
        });
    });
});

app.get('/*', function(req, res) {
    let ip = utility.getClientIP(req);
    let path = decodeURI(req.url);
    console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} ${ip} → Server ${'\033[40;32m'} request ${'\033[40;35m'}'${path}'${'\033'}[0m`);
    if (!fs.existsSync('data' + path)) {
        res.status(404).send('<center><h1>404 Not Found</h1><center><hr>');
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;31m'}[404 Not Found]`)
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[41;37m'} ${ip} ${'\033[40;31m'} request failed${'\033'}[0m`);
        return;
    }
    if (!req.session.view_mode) req.session.view_mode = 'view_list';
    fs.readdir('data' + path, function(err, dir) {
        if (err) return;
        let files = Array(dir.length);
        for (let i = 0; i < dir.length; i ++) {
            files[i] = {};
            files[i].dir = dir[i];
            let stat = fs.statSync('data' + path + dir[i]);
            if (stat.isFile()) {
                files[i].file_color = filetype.getFileColor(dir[i]);
                files[i].icon_color = filetype.getIconColor(dir[i]);
                files[i].icon = filetype.getFileIcon(dir[i]);
                files[i].type = filetype.getFileType(dir[i]);
            } else {
                files[i].file_color = 'indigo-accent folder';
                files[i].icon_color = 'indigo-accent folder';
                files[i].icon = 'folder';
                files[i].type = 'folder';
            }
        }
        files.sort(function(a, b) {
            if ((a.type == 'folder') ^ (b.type == 'folder')) return a.type == 'folder' ? -1 : 1;
            let _a = a.dir.toLowerCase(), _b = b.dir.toLowerCase();
            return _a == _b ? 0 : (_a < _b ? -1 : 1);
        });
        res.render('path', {
            path: path,
            files: files,
            view_mode: req.session.view_mode
        });
        console.log(`${'\033[46;37m'} ${utility.getLocaleDate()} ${'\033[44;37m'} Server → ${ip} ${'\033[40;32m'} send ${'\033[40;35m'}'${path}'${'\033'}[0m`);
    });
});

app.listen(8088, '0.0.0.0', function() {
    utility.initServer();
    console.log('\033[40;33mServer running at http://localhost:8088/\033[0m');
});
