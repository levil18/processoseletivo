$(document).ready(function() {
	$("#input-produto-preco").mask('#.##0,00', {reverse: true});
	$('#input-produto-data').datepicker("setDate", new Date());
});

function excluir(elem) {
	var idElemTr = $(elem).parent().parent().attr("id");
	swal({
		title: "Tem certeza que deseja excluir o produto?",
		text: "As informa��es sobre o produto ser�o apagadas.",
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
			swal("Exclu�do!", "O produto foi exclu�do com sucesso.", "success");
		}, 1000);
	});
}