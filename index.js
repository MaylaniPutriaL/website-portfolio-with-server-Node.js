const http = require('http');
const fs = require('fs');
const path = require('path'); 

const server = http.createServer((req, res) => {

    // halaman utama
    if (req.url === '/' || req.url === '/index.html') {
        res.setHeader("Content-Type", "text/html");
        res.statusCode = 200;

        let data = fs.readFileSync("index.html");
        res.end(data);
    }

    // file CSS
    else if (req.url.endsWith(".css")) {
        const cssPath = path.join(__dirname, req.url);
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end("CSS file not found");
            } else {
                res.setHeader("Content-Type", "text/css");
                res.statusCode = 200;
                res.end(data);
            }
        });
    }

    // gambar (jpg/jpeg/png/gif)
    else if (req.url.match(/\.(jpg|jpeg|png|gif)$/)) {
        const imgPath = path.join(__dirname, req.url);
        fs.readFile(imgPath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end("Image not found");
            } else {
                res.setHeader("Content-Type", "image/jpeg");
                res.statusCode = 200;
                res.end(data);
            }
        });
    }

    // 
    else {
        res.statusCode = 404;
        res.end("404 Not Found");
    }

});

const hostname = '127.0.0.1';
const port = 3000;
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
