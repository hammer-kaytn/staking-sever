require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const transfersRouter = require("./routes/transfers");
const blogsRouter = require("./routes/blogs");
const testRouter = require("./routes/test");

app.use("/api/transfers", transfersRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/test", testRouter);

app.listen(port, () => console.log(`서버 연결 ${port}`));
