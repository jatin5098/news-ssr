import express from "express";
import serverRenderer from "./serverRenderer";
import favicon from "serve-favicon";

const PORT = process.env.PORT || 9000;
const path = require("path");

const app = express();
const router = express.Router();

router.use("*", serverRenderer);
router.use(express.static(path.resolve(__dirname, "..", "build")));
app.use(express.static("build"));
app.use(favicon(path.join(__dirname, "..", "build", 'favicon.ico')));
app.use(router);
app.listen(PORT, () => console.log(`listening on: ${PORT}`));
