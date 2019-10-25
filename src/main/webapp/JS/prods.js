$(document).ready(function() {
	$("#input-produto-preco").mask('#.##0,00', {reverse: true});
	$('#input-produto-data').datepicker("setDate", new Date());
});

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
			swal("Excluído!", "O produto foi excluído com sucesso.", "success");
		}, 1000);
	});
}