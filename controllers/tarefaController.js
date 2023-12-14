const Tarefa = require('../models/tarefaModel');
let tarefas = [];
async function getTarefas(req, res) {
	tarefas= await Tarefa.listarTarefas(req.session.user.id_usuario);
	res.render('tarefas', { tarefas });
}

async function getTarefa(req, res) { 
	let tarefa= await Tarefa.buscarTarefa(req.params.idTarefa);  	
	if(tarefa.length > 0){
		tarefa=tarefa[0];

		res.render('tarefa', {tarefa});
	}else{
		res.render('404');
	}
	 
} 

async function addTarefa(req, res) { 
	const { titulo, descricao, idUsuario } = req.body;
	const tarefa = new Tarefa(null, titulo, descricao, null, idUsuario); 
	let msg = null;
	if(await Tarefa.salvar(tarefa)){
		msg = {
			class: "alert-success",
			msg: "Tarefa adicionada com sucesso!"
		}
		req.session.msg=msg;
		res.redirect("/tarefas");
	}else{
		msg = {
			class: "alert-danger",
			msg: "Não foi possível adicionar a tarefa!"
		}
		req.session.msg=msg;
		res.redirect("/tarefas");
	}
} 


async function deleteTarefa(req, res){
	let msg = null;
	if(await Tarefa.deleteTarefa(req.params.idTarefa)){
		msg = {
			class: "alert-success",
			msg: "Tarefa excluida com extremo sucesso!"
		}
		req.session.msg=msg;
		res.redirect("/tarefas");
	}else{
		msg = {
			class: "alert-danger",
			msg: "A exclusão falhou miseravelmente!"
		}
		req.session.msg=msg;
		res.redirect("/tarefas");
	}
}

async function checar(req, res){
	let msg = null;
	const resp = await Tarefa.checar(req.params.idTarefa, req.session.user.id_usuario);
	if(resp.status=='P'){
		msg = {
			class: "alert-success",
			msg: "Status de "+resp.title+" alterado para Finalizado"
		}
		req.session.msg=msg;
		res.redirect("/tarefas");
	}else{
		msg = {
			class: "alert-success",
			msg: "Status de "+resp.title+" alterado para Pendente"
		}
		req.session.msg=msg;
		res.redirect("/tarefas");
	}
}

async function editTarefa(req, res){
	let msg = null;
	const resp = await Tarefa.buscarTarefa(req.params.idTarefa);
	if (resp && resp.length > 0) {
		let tarefa = resp[0];
		res.render('formTarefa', { tarefa });
	} else {
		msg = {
			class: "alert-danger",
			msg: "Tarefa não encontrada!"
		}
		res.redirect('/tarefas');
	}
}

async function salvar(req,res) {
	let msg = null;
	const resp = await Tarefa.editar(req.body);
	if (resp && resp.length > 0) {
		let tarefa = resp[0];
		msg = {
			class: "alert-success",
			msg: "Tarefa atualizada!"
		}
		req.session.msg=msg;
		res.redirect('/tarefa/edit/'+tarefa.id_tarefa);
	} else {
		msg = {
			class: "alert-danger",
			msg: "Tarefa não encontrada!"
		}
		req.session.msg=msg;
		res.redirect('/');
	}	
}

module.exports = { getTarefas, getTarefa, addTarefa, deleteTarefa, editTarefa, checar, salvar };