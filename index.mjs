import express, {json} from "express"
import { riego_router } from "./Routes/riego_router.mjs"

const app = express();
const port = process.env.PORT ?? 1234;
app.disable("x-powered-by");

app.use(json());

app.use('/riego', riego_router);

app.listen(port, () => {
	console.log(`API in port ${port} ;)`)
})
