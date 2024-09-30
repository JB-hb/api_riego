import {createClient} from "@supabase/supabase-js"

const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJleWpodnBvZnR4eWFjemZpbGhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDAyMjk4OSwiZXhwIjoyMDM1NTk4OTg5fQ.VZztDvhMUwqvmlnbNN0jjrNkxZTpzRVU3JqoqjTn0OE';
const url = 'https://beyjhvpoftxyaczfilhm.supabase.co';
const supabase = createClient(url, key);


export class Riego_Module{

	static async consult_riego (temperature, humidity, addr){

		try{
			const{ data: Station, error } = await supabase
				.from("working_stations")
				.select(`*, 
						 Plantas(
						 	temperature,
							humidity
						 )`)
				.eq("mac", addr)
			
			if(Station && (Station.length > 0))
			{

				const {error} = await supabase
					.from("Medidas")
					.insert({Humidity: humidity, Temp: temperature, Station_Id: data[0].Id})

				if(humidity < data[0].Plantas[0].humidity)
				{
					return({station: addr, active: 1})
				}else
				{
					return({station: addr, active: 0})
				}

			}

			return({error:"non-station"})

		}
		catch(error)
		{
			console.log(error)
			return({error:"non-station"})
		}
	}

	static async get_pantas(){

	}

}

export class User_Module{

	//static async create_user
	//static async delete_user
	//static async change_password
	//static async change_mail
}

export class Stations_Module{

	static async get_info(user, station){
	//Funcion que envia los datos de una estacion de trabajo
		try{

			//Verificacion de que la estacion de trabajo este regitrada con es usuario

			const {data, error} = await supabase
				.from('working_stations')
				.select()
				.eq('Client_Id', user)
				.eq('Id', station)
			
			if(data  && (data.length > 0))
			{

				//Buscar informacion de la estacion de trabajo en la base de datos

				const {data, error} = await supabase
					.from('Medidas')
					.select(
						`Humidity,
						Temp,
						working_stations(
							Sustrato,
							Change_Date
						)
						`
					)
					.eq('Station_Id', station)
					.order('created_at', {ascending: false})
					.limit(1)

				if(data)
				{

					//Envio de registro de acciones

					const {error} = await supabase
						.from('Actions')
						.insert({Action:'get info work station', User_Id:user, Station_Id:station})

					if(error){
						console.log(error)
					}
					
					return(data)
				}

				return({error: 'no se encontro la informacion solicitada'})
			}

			return({error: 'estacion no registrada al usuario'})

		}catch(error){
			console.log(error)
		}
	}

	static async get_pins_stations(frame){

		try{

			let resp = {
				data:[]
			}

			const {data, error} = await supabase
				.from('working_stations')
				.select(`mac,
					 pin`)
				.eq('Frame_Id', frame)

			if(data && (data.length > 0))
			{
				for(let i = 0; i < data.length; i++)
				{
					resp.data.push(data[i])
				}
				return(resp)
			}

			return(error)

		}catch(error){
			console.log(error)
		}
		
	}

	static async act_info(user, station, content){

		const {data, error} = await supabase
			.from('working_stations')
			.select()
			.eq('Client_Id', user)
			.eq('Id', station)

		if(data && (data.length > 0)){

			const {error} = await supabase
				.from('working_stations')
				.update({Plant: content.planta, Sustrato: content.sustrato, Change_Date: content.change})
				.eq({Id:station})
			
			if(!error){
				const {error} = await supabase
				.from('Actions')
				.insert({Action:'patch info work station', User_Id:user, Station_Id:station})
			}else
			{
				return({message: 'error al actualizar la estacion', error: error})
			}

			if(error){
				console.log(error)
			}

			return({message: 'estacion actualizada correctamente'})

		}

		return({message: 'no se encontro la estacion de trabajo', error: 1})

	}
	
}
