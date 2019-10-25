<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	
	<title>Processo Seletivo</title>
<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css">
</head>
<body style="margin: 20px">
	<h1>Hello World!</h1>

<header>
		<div>
			<ul class="nav nav-tabs">
				<li class="active"><a href="#home" data-toggle="tab">Início</a></li>
				<li><a href="#cadProd" data-toggle="tab">Cadastrar produto</a></li>
				<li><a href="#listProd" data-toggle="tab">Listar produtos</a></li>
			</ul>
		</div>
	</header>
	<div class="tab-content">
		<div class="tab-pane active" id="home">
			<section>
				<h3>Sobre o desafio</h3>
				<p>Criar um sistema com CRUD de produtos</p>
		
				<h3>Requisitos do desafio</h3>
				<ol>
					<li>
						<p>O sistema deverá ter um formulário para cadastro de produto com os campos: nome, preço, quantidade e data de cadastro. (Cadastrar produtos)</p>
					</li>
					<li>
						<p>O sistema deverá ter uma página com uma tabela para mostrar os dados cadastrados pelo formulário. (Listar produtos)</p>
					</li>
					<li>
						<p>Na tabela deverá ter a opção para editar e remover o produto.</p>
					</li>
					<li>
						<p>Colocar no seu Github o código do projeto e enviar o link para o email: <a href="mailto:rh@fattoriaweb.com.br">rh@fattoriaweb.com.br</a></p>
					</li>
					<li>
						<p>(DIFERENCIAL) Você pode deixar seu código rodando na web, para que possamos analisá-lo. (AWS, Heroku, Openshift...)</p>
					</li>
				</ol>
			</section>
			<section>
				<h3>Requisitos técnicos</h3>
				<ol>
					<li>
						<p>O projeto deve utilizar Maven e Java 8. Pode utilizar este projeto como base.</p>
					</li>
					<li>
						<p>Deve conter validações tanto no frontend quanto no backend</p>
					</li>
					<li>
						<p>Importante demonstrar conhecimento de Javascript. Pode utilizar bibliotecas ou frameworks (AngularJS, Jquery, React...)</p>
					</li>
					<li>
						<p>Não é necessário utilizar banco de dados</p>
					</li>
					<li>
						<p>(DIFERENCIAL) Utilizar banco de dados relacional e Hibernate no projeto.</p>
					</li>
				</ol>
			</section>
		</div>
		<div class="tab-pane" id="cadProd">
			<section class="container-fluid">
				<h3>Cadastro de Produto</h3>
				<div class="hidden alert  alert-danger alert-dismissible" role="alert">
					<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					Já existe um produto com o nome informado.
				</div>
				<form method="post" class="form-vertical  js-form-loading">
					<div class="form-group">
						<label for="input-produto-nome">Nome do Produto</label>
						<input id="input-produto-nome" type="text" class="form-control"/>
					</div>
					<div class="form-group">
						<label for="input-produto-descricao">Descrição</label>
						<textarea id="input-produto-descricao" rows="3" class="form-control"></textarea>
					</div>
					<div class="row">
						<div class="col-sm-3">
							<label for="input-produto-preco">Preço unitário</label>
							<div class="form-group input-group">
								<span class="input-group-addon">R$</span>
								<input id="input-produto-preco" type="text" class="form-control" placeholder="0,00">
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label for="input-produto-estoque">Quantidade</label>
								<input id="input-produto-estoque" type="number" class="form-control" placeholder="Unidades"/>
							</div>
						</div>
						
						<div class="col-sm-3">
							<label for="input-produto-data">Data de Cadastro</label>
							<div class="form-group input-group">
								<input type="text" class="form-control" data-date-format="dd/mm/yyyy" name="dataCad" id="input-produto-data" readonly disabled>
								<span class="input-group-addon glyphicon glyphicon-calendar"  style="top: 0;"></span>
							</div>
						</div>
					</div>
					<div class="form-group">
						<button class="btn  btn-primary" type="submit">Salvar</button>
						<a href="pesquisa-produtos.html" class="btn btn-default">Cancelar</a>
					</div>
				</form>
			</section>
		</div>
		<div class="tab-pane" id="listProd">
			<section id="list" class="row">
				<div class="table-responsive col-md-12">
					<table class="table table-striped" cellspacing="0" cellpadding="0">
						<thead>
							<tr>
								<th>Nome do Produto</th>
								<th>Descrição</th>
								<th>Preço</th>
								<th>Quantidade</th>
								<th>Data de Cadastro</th>
								<th class="actions">Ações</th>
							</tr>
						</thead>
						<tbody>
							<tr id="1001">
								<td>Maçã</td>
								<td>Lorem ipsum dolor sit amet, consectetur adipiscing</td>
								<td>R$ 2,00</td>
								<td class="text-center">98</td>
								<td>25/10/2019</td>
								<td class="actions">
									<a class="btn btn-warning btn-xs" href="edit.html">Editar</a>
									<a class="btn btn-danger btn-xs"  href="#" onclick="excluir(this)">Excluir</a>
								</td>
							</tr>
							<tr id="1002">
								<td>Morango</td>
								<td>Lorem ipsum dolor sit amet, Strawberry consectetur adipiscing</td>
								<td>R$ 4,00</td>
								<td class="text-center">27</td>
								<td>24/10/2019</td>
								<td class="actions">
									<a class="btn btn-warning btn-xs" href="edit.html">Editar</a>
									<a class="btn btn-danger btn-xs"  href="#" onclick="excluir(this)">Excluir</a>
								</td>
							</tr>
							<tr id="1003">
								<td>Laranja</td>
								<td>Lorem ipsum dolor sit amet, Orange consectetur adipiscing</td>
								<td>R$ 3,00</td>
								<td class="text-center">64</td>
								<td>21/10/2019</td>
								<td class="actions">
									<a class="btn btn-warning btn-xs" href="edit.html">Editar</a>
									<a class="btn btn-danger btn-xs"  href="#" onclick="excluir(this)">Excluir</a>
								</td>
							</tr>
							<tr id="1004">
								<td>Banana</td>
								<td>Lorem ipsum dolor sit amet, Banana consectetur adipiscing</td>
								<td>R$ 5,00</td>
								<td class="text-center">88</td>
								<td>21/10/2019</td>
								<td class="actions">
									<a class="btn btn-warning btn-xs" href="edit.html">Editar</a>
									<a class="btn btn-danger btn-xs"  href="#" onclick="excluir(this)">Excluir</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
			<div id="bottom" class="row">
				<div class="col-md-12">
					
					<ul class="pagination">
						<li class="disabled"><a>&lt; Anterior</a></li>
						<li class="disabled"><a>1</a></li>
						<li><a href="#">2</a></li>
						<li><a href="#">3</a></li>
						<li class="next"><a href="#" rel="next">Próximo &gt;</a></li>
					</ul><!-- /.pagination -->
					
				</div>
			</div>
		</div>
	</div>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js' type='text/javascript'></script>
	<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js' type='text/javascript'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/js/bootstrap-datepicker.min.js' type='text/javascript'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js' type='text/javascript'></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>
	<script src='JS/prods.js' type='text/javascript'></script>
</body>
</html>
