class Usuario { 
	constructor(id, title, description) { 
		this.id = id; 
		this.title = title; 
		this.description = description; 
	} 
	static async autenticar(email, senha){
		const md5 = require('md5');
		const Database= require('./Database');
		let sql=`SELECT * FROM usuario WHERE email ='${email}' AND senha ='${md5(senha)}';`;
		console.log(sql);
		return await Database.query(sql);
		
	}

	static async listarUsuarios(){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM usuario;");
		
	}

	static async buscarUsuario(idUsuario) {
		const Database= require('./Database');
		return await Database.query(`SELECT * FROM usuario WHERE id_usuario=${idUsuario};`);
		
	}

	


	static async inicio() {
		const Database= require('./Database');
		const iniciado = await Database.query("SELECT * FROM usuario WHERE id_usuario=1 AND nome='nome' AND email='email' AND senha='curso';");
		if(iniciado.length == 0){
			await Database.query(`
   CREATE TABLE IF NOT EXISTS tarefa (
      id_tarefa int unsigned NOT NULL AUTO_INCREMENT,
      title varchar(45) NOT NULL,
      description tinytext NOT NULL,
      status char(1) NOT NULL DEFAULT 'P',
      usuario_id_usuario int unsigned NOT NULL,
      PRIMARY KEY (id_tarefa),
      UNIQUE KEY id_tarefa_UNIQUE (id_tarefa),
      KEY fk_tarefa_usuario_id_usuario_idx (usuario_id_usuario),
      CONSTRAINT fk_tarefa_usuario_id_usuario FOREIGN KEY (usuario_id_usuario) REFERENCES usuario (id_usuario)
   ) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=armscii8;
`);


			await Database.query("USE mvctrabalho2");
			await Database.query("CREATE TABLE IF NOT EXISTS `usuario` (  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,  `nome` varchar(45) NOT NULL,  `email` varchar(60) NOT NULL,  `senha` varchar(60) NOT NULL, PRIMARY KEY (`id_usuario`),  UNIQUE KEY `id_usuario_UNIQUE` (`id_usuario`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;")
			await Database.query("INSERT INTO `usuario` (`id_usuario`, `nome`, `email`, `senha`) VALUES (1, 'nome', 'email', 'curso');");
			await Database.query("INSERT INTO `usuario` (`nome`, `email`, `senha`, `imagem`)VALUES ('Cimol','infoCimol@gmail.com', 'abacate');");
			await Database.query("INSERT INTO `usuario` (`nome`, `email`, `senha`)VALUES ('Testador','testando@gmail.com', '698dc19d489c4e4db73e28a713eab07b');");
			await Database.query("CREATE TABLE `tarefa` (  `id_tarefa` int unsigned NOT NULL AUTO_INCREMENT,  `title` varchar(45) NOT NULL,  `description` tinytext NOT NULL,  `status` char(1) NOT NULL DEFAULT 'P',  `usuario_id_usuario` int unsigned NOT NULL,  PRIMARY KEY (`id_tarefa`),  UNIQUE KEY `id_tarefa_UNIQUE` (`id_tarefa`),  KEY `fk_tarefa_usuario_id_usuario_idx` (`usuario_id_usuario`),  CONSTRAINT `fk_tarefa_usuario_id_usuario` FOREIGN KEY (`usuario_id_usuario`) REFERENCES `usuario` (`id_usuario`)) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=armscii8;");
			await Database.query("INSERT INTO `tarefa` (`title`, `description`, `usuario_id_usuario`)VALUES ('Terminar o Programa', 'Fazer o que falta ser feito', 2);");
			await Database.query("INSERT INTO `tarefa` (`title`, `description`, `usuario_id_usuario`)VALUES ('Passar de Ano', 'Feliz Natal', 2);");
			await Database.query("INSERT INTO `tarefa` (`title`, `description`, `usuario_id_usuario`)VALUES ('Testar o Programa', 'Conferir se está tudo funcionando', 3);");
			await Database.query("INSERT INTO `tarefa` (`title`, `description`, `usuario_id_usuario`)VALUES ('Corrigir o Programa', 'Corrigir o que deu errado', 3);");
			return true;
		}else{
			return false;
		}
	}

	static async salvar(req, idUsuario){
		const Database= require('./Database');
		await Database.query(`UPDATE usuario SET nome='${req.nome}' , email= '${req.email}' WHERE id_usuario=${idUsuario};`);
		
		return await Database.query(`SELECT * FROM usuario WHERE id_usuario=${idUsuario};`);
		
	}

} 

module.exports = Usuario;
	