import express from "express";
import serverRenderer from "./serverRenderer";

const PORT = 3001;
const path = require("path");

const app = express();
const router = express.Router();

router.use("*", serverRenderer);
router.use(express.static(path.resolve(__dirname, "..", "build")));
app.use(express.static("build"));
app.use(router);
app.listen(PORT, () => console.log(`listening on: ${PORT}`));
