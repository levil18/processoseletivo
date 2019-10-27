var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do item selecionado na lista
var tbProdutos = localStorage.getItem("tbProdutos");// Recupera os dados armazenados;
var dataHoje; // variavel global para armazenar a data de hoje para aplicar no reset
var campos = ["nome","descricao","preco","estoque","data"]

$(document).ready(function() {
	$("#input-produto-preco").mask('#.##0,00', {reverse: true}); //máscara de preço
	$('#input-produto-data').datepicker("setDate", new Date());//seta a data de hoje no input de data
	dataHoje = $('#input-produto-data').val(); //seta a data de hoje na variável global
	$('#input-produto-id').val(Math.floor(Math.random() * 9999)+1); //gerador de números aleatório para ID
	tbProdutos = JSON.parse(tbProdutos); //Converte string para objeto
	//tbProdutos == null ? tbProdutos = []; :  Listar(true); //esta era a linha anterior sem a função de popular a lista
	tbProdutos == null ? ProtInfs() :  Listar(true); //Caso não exista conteúdo seta um array vazio, senão lista os produtos
	//Função apenas para popular a lista. Somente para exemplo.
});

//----------------------------- Interação ------------------------------------------------
//função para excluir um produto com confirmação
function excluir(elem) {
	var idElemTr = $(elem).parent().parent().attr("id");
	swal({
		title: "Tem certeza que deseja excluir o produto?",
		text: "As informações sobre o produto serão apagadas.",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "Sim, excluir",
		cancelButtonText: "Cancelar",
		closeOnConfirm: false,
		showLoaderOnConfirm: true
		}, function() {
		setTimeout(function() {
			$("#"+idElemTr).remove();
			Exclusao(Procura(idElemTr));
			swal("Excluído!", "O produto foi excluído com sucesso.", "success");
		}, 1000);
	});
}

//função atribuída para o botão editar em cada produto
function Edicao(elem){
	var idElemTr = $(elem).parent().parent().attr("id");
	$("#input-produto-id").val(idElemTr);
	for(var i = 0; i < campos.length; i++){
		if(campos[i] == "preco"){
			$("#input-produto-"+campos[i]).val($("#"+idElemTr).find("td").eq(i).text().replace("R$ ", ""));
		}else{
			$("#input-produto-"+campos[i]).val($("#"+idElemTr).find("td").eq(i).text());
		}
	}
	$(".nav-tabs li").find("a").eq(1).click();
	$("#salva").text("Modificar");
	operacao = "E";
}

function validacao(){
	var resposta = "";
	if($("#input-produto-estoque").val() == ""){
		resposta = resposta + "A quantidade do produto está vazia!\n";
		$("#input-produto-estoque").focus();
	}
	if($("#input-produto-preco").val() == ""){
		resposta = resposta + "O Preço do produto está vazio!\n";
		$("#input-produto-preco").focus();
	}
	if($("#input-produto-nome").val() == ""){
		resposta = resposta + "O Nome do produto está vazio!\n";
		$("#input-produto-nome").focus();
	}
	return resposta;
}

//-------------- Eventos ----------------------
$("#salva").on("click",function(){
	if(validacao()){
		swal({
			type: 'error',
			title: 'Campo(s) Vazio(s)!',
			text: validacao()
		});
	} else {
		operacao == "A" ? Adicionar() :  Editar();
	}
});	

$("#reset").on("click",function(){
	$("#salva").text("Salvar");
	//serve para preencher a data novamente
	setTimeout(function() {
		if ($('#input-produto-data').val() == ""){
			$('#input-produto-data').val(dataHoje);
		}
		if ($('#input-produto-id').val() == ""){
			$('#input-produto-id').val(Math.floor(Math.random() * 9999)+1);
		}
	}, 1);
	operacao = "A";
});	

//------------------------ Funções para Manipulação de Dados -----------------------------------------
function Adicionar(){
	if(ProcuraNome($("#input-produto-nome").val())){
		swal("Produto Existente!", "Já existe um produto com o nome informado.", "error");
		return false;
	} else {
		var produto = JSON.stringify({
			Codigo   		: $("#input-produto-id").val(),
			Nome   			: $("#input-produto-nome").val(),
			Descricao     	: $("#input-produto-descricao").val(),
			Preço 			: "R$ " + $("#input-produto-preco").val(),
			Quantidade 	   	: $("#input-produto-estoque").val(),
			Data    		: $("#input-produto-data").val()
		});
		tbProdutos.push(produto);
		localStorage.setItem("tbProdutos", JSON.stringify(tbProdutos));
		swal("Produto adicionado!", "O produto foi adicionado com sucesso.", "success");
		Listar(false);
		$("#reset").click();
		$('#input-produto-data').datepicker("setDate", new Date());
		$('#input-produto-id').val(Math.floor(Math.random() * 9999)+1);
		$(".nav-tabs li").last().find("a").click();
		return true;
	}
}

//função para salvar as modificações do produto no banco de dados
function Editar(indice_selecionado){
	var idElemTr = $("#input-produto-id").val();
	var indice_selecionado = Procura(idElemTr);
	
	tbProdutos[indice_selecionado] = JSON.stringify({
		Codigo   		: $("#input-produto-id").val(),
		Nome   			: $("#input-produto-nome").val(),
		Descricao     	: $("#input-produto-descricao").val(),
		Preço 			: "R$ " + $("#input-produto-preco").val(),
		Quantidade 	   	: $("#input-produto-estoque").val(),
		Data    		: $("#input-produto-data").val()
	});//Altera o item selecionado na tabela
	localStorage.setItem("tbProdutos", JSON.stringify(tbProdutos));
	
	for(var i = 0; i < campos.length; i++){
	
		if(campos[i] == "preco"){
			$("#"+idElemTr).find("td").eq(i).text("R$ " + $("#input-produto-"+campos[i]).val());
		}else{
			$("#"+idElemTr).find("td").eq(i).text($("#input-produto-"+campos[i]).val());
		}
	}
	operacao = "A"; //Volta ao padrão
	setTimeout(function() {
		swal("Produto editado!", "As informações do produto foram alteradas.", "success");
		$(".nav-tabs li").last().find("a").click();
		$("#reset").click();
	}, 700);
	return true;
}

//função pra excluir o produto da base de dados
function Exclusao(indice_selecionado){
	if(indice_selecionado != -1){
		tbProdutos.splice(indice_selecionado, 1);
		localStorage.setItem("tbProdutos", JSON.stringify(tbProdutos));
	}
}
function Listar(adiciona){
	var i = adiciona == true ? 0 : (tbProdutos.length-1);
	for (i = i; i < tbProdutos.length; i++) {
		var prod = JSON.parse(tbProdutos[i]);
		var string = ""
		string = string + "<tr id='"+prod.Codigo+"'>";
		string = string + "<td>"+prod.Nome+"</td>";
		string = string + "<td>"+prod.Descricao+"</td>";
		string = string + "<td>"+prod.Preço+"</td>";
		string = string + "<td class='text-center'>"+prod.Quantidade+"</td>";
		string = string + "<td class='text-center'>"+prod.Data+"</td>";
		string = string + "<td class='actions'></td>";
		string = string + "</tr>"
		$(".table tbody").append(string);
		string = "<a class='btn btn-warning btn-xs' href='#' onclick='Edicao(this)' style='margin-right: 4px;'>Editar</a>";
		$(".table tbody tr#"+prod.Codigo+" td.actions").append(string);
		string = "<a class='btn btn-danger btn-xs' href='#' onclick='excluir(this)'>Excluir</a>";
		$(".table tbody tr#"+prod.Codigo+" td.actions").append(string);
	}
}

function Procura(id){
	var i = -1, produto;
	if(tbProdutos != null && tbProdutos != ""){
		do{
			i++;
			produto = JSON.parse(tbProdutos[i]);
		}while(id != produto.Codigo);
		return i;
	} else {
		return -1;
	}
}

function ProcuraNome(prod){
	var produto, codigo = 0;
	if(tbProdutos != null && tbProdutos != ""){
		for (var i in tbProdutos) {
			produto = JSON.parse(tbProdutos[i]);
			if(TiraAcento(prod.toLowerCase()) == TiraAcento(produto.Nome.toLowerCase())){
				codigo = produto.Codigo;
			}
		}
	}
	return codigo;
}

function TiraAcento(texto) { 
    acentuadas = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ'; 
    comuns = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC'; 
    refeita=''; 
    for(i=0;i<texto.length;i++) { 
        if (acentuadas.search(texto.substr(i,1))>=0) { 
            refeita+=comuns.substr(acentuadas.search(texto.substr(i,1)),1); 
        } else { 
            refeita+=texto.substr(i,1); 
        } 
    } 
    return refeita; 
}

//Função apenas para popular a lista para fins de exemplos, como citado no início
function ProtInfs(){
		tbProdutos = [];
		var frutas = new Array(["1001","Maçã","Lorem ipsum dolor sit amet, Apple consectetur adipiscing", "2,00","98","19/10/2019"], 
		["1002","Morango","Lorem ipsum dolor sit amet, Strawberry consectetur adipiscing", "4,00","27","20/10/2019"], 
		["1003","Laranja","Lorem ipsum dolor sit amet, Orange consectetur adipiscing", "3,00","64","21/10/2019"], 
		["1004","Banana","Lorem ipsum dolor sit amet, Banana consectetur adipiscing", "5,00","88","22/10/2019"]);
		var camposJson = ["Codigo","Nome","Descricao","Preço","Quantidade","Data"];
		var j, k, produto, string="", objAux;
		for(j = 0; j < frutas.length; j++){
			string = "{"
			for(k = 0; k < camposJson.length; k++){
				if(camposJson[k] == "Preço"){
					string = string +" \"" + camposJson[k] +   "\" : \"R$ " + frutas[j][k] + "\"," 
				}else{
					string = string +" \"" + camposJson[k] +   "\" : \"" + frutas[j][k] + "\","
				}
			}
			string = string.substr(0, string.length-1) + " }";
			objAux = JSON.parse(string);
			produto = JSON.stringify(objAux);
			tbProdutos.push(produto);
			localStorage.setItem("tbProdutos", JSON.stringify(tbProdutos));
			Listar(false);
		}
		return true;
}