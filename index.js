const http = require("http");
const fs = require("fs");

const errorHtml = fs.readFileSync("assets/error.html");

const sendFileOrError = (path, response) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      response.end(errorHtml);
      return;
    }

    response.end(data.toString());
  });
};

const server = http.createServer((request, response) => {
  console.log("neue request", request.method, request.url);
  if (request.url === "/") {
    sendFileOrError("assets/index.html", response);
  } else {
    sendFileOrError("assets" + request.url, response);
  }
});

const PORT = 9000;
server.listen(PORT, () => console.log("Server listening to port", PORT));
