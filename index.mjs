import express from "express"

const app = express();
const port = process.env.PORT ?? 1234;
app.disable("x-powered-by");

app.get('/consult', (req,res) => {
	res.status(200).json({agua:"20", temp:"45"});
})

app.post('/sync/ET/:IdNum/:key',(req,res) => {
	//link donde se va a manejar la solicitud de sincronizacion de la estacion de trabajo
	res.status(200).json(req.params);
}) 

app.post('sync/UD/:IdNum/:key',(req,res) => {
	//link donde se va a manejar la solicitud de sincronizacion del dispositivo del usuario
})

app.get('info/get/:SerialNum', (req,res) => {
	//link que enviara la informacion de una estacion de trabajo
})

app.patch('info/patch/:SerialNum', (req,res) => {
	//link que actualizara la informacion de una estacion de trabajo (cambio de sustrato, tipo de planta)
})



app.listen(port, () => {
	console.log(`API in port ${port} ;)`)
})
