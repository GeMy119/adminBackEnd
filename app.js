import express from "express"
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"
import morgan from "morgan";
import { connection } from "./config/connection/connectionDB.js";
import globalError from "./config/handleError.js";
import ApiError from "./utils/apiError.js";
import userRouter from "./router/user.router.js";
import adminRouter from "./router/admin.router.js";
import sponsorRouter from "./router/sponsor.router.js";
import visitRouter from "./router/visit.router.js";
const app = express()
const port = process.env.PORT || 8080
if (process.env.MODE_ENV === "development") {
    app.use(morgan("dev"))
    console.log(process.env.MODE_ENV)
}
app.use(express.json())
app.set('view engine', 'ejs');
app.use(cors())
app.use(morgan())
connection()
app.use(globalError)
app.use(userRouter)
app.use(adminRouter)
app.use(sponsorRouter)
app.use(visitRouter)
app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
process.on("unhandledRejection", (err) => {
    console.error(`unhandledRejection errors: ${err.name} | ${err.message}`)
    server.close(() => {
        console.log("shutting down....")
        process.exit(1)
    })
})