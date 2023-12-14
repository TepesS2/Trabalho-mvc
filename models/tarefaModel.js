class Tarefa { 
	constructor(id, title, description, status, idUsuario) { 
		this.id = id; 
		this.title = title; 
		this.description = description; 
		this.status = status;
		this.usuario_id_usuario = idUsuario;
	} 

	static async listarTarefas(id_usuario){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM tarefa WHERE usuario_id_usuario="+id_usuario);		
	}

	static async buscarTarefa(id_tarefa){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM tarefa WHERE id_tarefa="+id_tarefa);
	}

	static async deleteTarefa(id_tarefa){
		const Database= require('./Database');
		const resp= await Database.query("DELETE FROM tarefa WHERE id_tarefa="+id_tarefa);
		if(resp){
			if(resp.affectedRows >0)
				return true;
			else
				return false;''
		}else{
			return false;
		}		
	}

	static async salvar(tarefa){
		const Database= require('./Database');
		const resp=await Database.query("INSERT INTO tarefa (title,description,usuario_id_usuario) VALUES ('"+tarefa.title+"','"+tarefa.description+"',"+tarefa.usuario_id_usuario+")");
		if(resp){
			if(resp.affectedRows >0)
				return true;
			else
				return false;''
		}else{
			return false;
		}
	}


	static async checar(id_tarefa, idUsuario){
		const Database= require('./Database');
		let resp = await Database.query("SELECT * FROM tarefa WHERE id_tarefa="+id_tarefa+" AND usuario_id_usuario="+idUsuario);
		if(resp[0].status == 'P'){
			await Database.query("UPDATE tarefa SET status='F' WHERE id_tarefa="+id_tarefa+" AND usuario_id_usuario="+idUsuario);
			return resp[0];
		}else{
			await Database.query("UPDATE tarefa SET status='P' WHERE id_tarefa="+id_tarefa+" AND usuario_id_usuario="+idUsuario);
			return  resp[0];
		}

	}

	static async editar(req){
		const Database= require('./Database');
		await Database.query(`UPDATE tarefa SET title='${req.titulo}' , description= '${req.descricao}' WHERE id_tarefa=${req.idTarefa} AND usuario_id_usuario=${req.idUsuario};`);
		
		return await Database.query(`SELECT * FROM tarefa WHERE id_tarefa=${req.idTarefa}`);
		
	}
}

module.exports = Tarefa;
	