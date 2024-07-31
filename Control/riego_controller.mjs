import { Riego_Module, Stations_Module } from "../Modules/riego_module.mjs"

export class Riego_Controller {

	static async Consult_Riego (req, res){
		console.log("entramos")
		const respuesta = await Riego_Module.consult_riego() //funcion que evaluara si el debe regar o no
		res.json({code:200, response: respuesta})
	}

	static async Get_Info (req, res){
		const { serial } = req.params
		const { user } = res.body
		const respuesta = await Stations_Module.get_info(user, serial)
		res.json(respuesta)
	}

	static async Patch_Info (req, res){
		const { serial } = req.params
		const { user, content} = res.body
		const respuesta = await Stations_Module.act_info(user, serial, content)  //funcion que parcheara la informaion de la estacion de trabajo
		res.status(200).json(respuesta)
	}

}
