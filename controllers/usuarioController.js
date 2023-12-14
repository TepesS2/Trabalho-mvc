const Usuario = require('../models/usuarioModel'); 

let usuarios = [];

async function getUsuarios(req, res) { 
	usuarios= await Usuario.listarUsuarios();  	
	res.render('usuarios', { usuarios }); 
} 

async function login(res) {
	if(await Usuario.inicio()){
		console.log("Email 1:\ninfoCimol@gmail.com\nSenha 1:\ncimol\n\nEmail 2:\ntestando@gmail.com\nSenha 2:\nteste");
	}
	res.render('login'); 
} 

async function autenticar(req,res) { 
	const resp = await Usuario.autenticar(req.body.email, req.body.senha);
	if (resp && resp.length > 0) {
		req.session.user = resp[0];
		res.redirect('/');
	} else {
		res.redirect('/login');
	}
} 

async function logout(req,res) {
	delete req.session.user;
	res.redirect('/login');
}

async function editar(req,res) {
	let msg = null;
	const resp = await Usuario.buscarUsuario(req.params.idUsuario);
	if (resp && resp.length > 0) {
		let usuario = resp[0];
		delete usuario.senha;
		res.render('usuario/formUsuario', { usuario });
	} else {
		msg = {
			class: "alert-danger",
			msg: "Perfil não encontrado!"
		}
		req.session.msg=msg;
		res.redirect('/usuario/perfil/'+req.params.idUsuario);
	}
}

async function mostrarPerfil(req,res) {
	let msg = null;
	const resp = await Usuario.buscarUsuario(req.params.idUsuario);
	if (resp && resp.length > 0) {
		let usuario = resp[0];
		delete usuario.senha;
		res.render('usuario/usuario', { usuario });
	} else {
		msg = {
			class: "alert-danger",
			msg: "Perfil não encontrado!"
		}
		res.redirect('/');
	}	
	
}

async function salvar(req,res) {
	let msg = null;
	const resp = await Usuario.salvar(req.body,req.session.user.id_usuario);
	if (resp && resp.length > 0) {
		let usuario = resp[0];
		delete usuario.senha;
		msg = {
			class: "alert-success",
			msg: "Perfil atualizado!"
		}
		req.session.msg=msg;
		res.redirect('/usuario/editar/'+usuario.id_usuario);
	} else {
		msg = {
			class: "alert-danger",
			msg: "Perfil não encontrado!"
		}
		req.session.msg=msg;
		res.redirect('/');
	}	
}





module.exports = { 
	getUsuarios, 
	login, 
	autenticar, 
	logout, 
	mostrarPerfil, 
	editar,
	salvar
};