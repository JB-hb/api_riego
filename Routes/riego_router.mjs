import {Router} from 'express'
import { Riego_Controller } from '../Control/riego_controller.mjs'

export const riego_router = Router();

riego_router.get('/consult', Riego_Controller.Consult_Riego);

riego_router.post('/sync/ET/:id_num', (req,res) => { //solicitud de la estacion de trabajo
	Mes.status(404).json({message: "Work in Progress"})
})
riego_router.post('sync/UD/:id_num', (req, res) => { //solicitud del dispositivo del usuario
	res.status(404).json({message: "Work in Progress"})
})

riego_router.get('/info/get/:serial', Riego_Controller.Get_Info);
riego_router.patch('info/patch/:serial', Riego_Controller.Patch_Info);
riego_router.get('info/frame/get-pins/:serial', Riego_Controller.Get_Pins);
