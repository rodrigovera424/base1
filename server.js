const express = require('express');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const exphbs  = require('express-handlebars');
const router = require('./routes.js');

const { optionsMariaDB } = require("./options/mariaDB");
const { optionsSQLite3 } = require("./options/sqlite3");

const Contenedor = require('./contenedor');
let contenedorProduct = new Contenedor('product', optionsMariaDB);
let contenedorMessage = new Contenedor('message', optionsSQLite3);

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", router);
app.use("/static", express.static(__dirname + "/public"));

app.use(errorHandler);

app.engine('handlebars', exphbs.engine({ 
    layoutsDir: `${__dirname}/views/layouts`
}))

app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', async function(req,res) {
    res.render('create', { layout: 'index' });
});

const port = 8080;

httpServer.listen(port, async () => {
    console.log(`Servidor http escuchando en el puerto ${port}`);
});
  
io.on("connection", async (socket) => {
    console.log("Un cliente se ha conectado");
    let productList = await contenedorProduct.getAll();
    let messageList = await contenedorMessage.getAll();
    socket.emit("product-list", productList);    
    socket.emit("message-list", messageList);

    socket.on("new-product", async (data) => {
        productList.push(data);
        await contenedorProduct.save(data);
        io.sockets.emit("product-list", productList);
    });    

    socket.on("new-message", async (data) => {
      console.log(data);
      messageList.push(data);
      await contenedorMessage.save(data);
      io.sockets.emit("message-list", messageList);
    });
});

