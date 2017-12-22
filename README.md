# TJack Durns Manager

## Overview
This is a simple RESTful server generated via swagger-editor from a swagger .yaml API description.
It currently has a dummy backend, but allows creating and querying durns accounts via IRC vhost or an account number.
It also allows payments to be maid between accounts via vhosts or addresses if clients use an API key.

### Running the server
To run, make sure you have node installed. Developed under node 5.
Do the following:
```
npm install
npm start
```

The server currently runs on port 8080. To view the Swagger UI interface:

```
open http://localhost:8080/docs
```
