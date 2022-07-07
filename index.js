// Alex Tresselt 7/5/22
const http = require('http')
const fs = require('fs').promises

// Server address
const host = 'localhost'
const port = process.env.PORT || 3000

// Load Pages
let index;
let about;
let contactme;
let notfound;

fs.readFile(__dirname + "/index.html")
    .then(contents => {
        index = contents;
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
});

fs.readFile(__dirname + "/about.html")
    .then(contents => {
        about = contents;
    })
    .catch(err => {
        console.error(`Could not read about.html file: ${err}`);
        process.exit(1);
});

fs.readFile(__dirname + "/contact-me.html")
    .then(contents => {
        contactme = contents;
    })
    .catch(err => {
        console.error(`Could not read contact-me.html file: ${err}`);
        process.exit(1);
});

fs.readFile(__dirname + "/404.html")
    .then(contents => {
        notfound = contents;
    })
    .catch(err => {
        console.error(`Could not read 404.html file: ${err}`);
        process.exit(1);
});

// Handle Requests
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    switch (req.url) {
        case "/":
            console.log("Serving page: Index")
            res.writeHead(200);
            res.end(index);
            break
        case "/index":
            console.log("Serving page: Index")
            res.writeHead(200);
            res.end(index);
            break
        case "/about":
            console.log("Serving page: About")
            res.writeHead(200);
            res.end(about);
            break
        case "/contactme":
            console.log("Serving page: Contact Me")
            res.writeHead(200);
            res.end(contactme);
            break
        default:
            console.log("Serving page: 404 Not Found")
            res.writeHead(404);
            res.end(notfound);
    }
}

// Start Server
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
