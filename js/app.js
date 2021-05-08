$(document).ready(() => {

    //Função que percorre e atualizar os totalizadores
    const atualizarCarrinho = () => {
        var total = 0;
        var total_registros = 0;
        try {

            $("#carrinho").find("article").each(function (index) {
                let qtde = $(this).find("input[name='qtde']").val();
                let valor = $(this).find("input[name='valor']").val();
                total_registros = total_registros + parseInt(qtde);
                total = total + (qtde * valor);
            });

            let total_formatado = "R$ " + total.toFixed(2).replace(".", ",");

            $("#valor-total").html(total_formatado);
            $("#total-itens").html(total_registros);
        } catch (e) {
            console.log(`falha ao atualizar o Carrinho\n${e}`);
        }
    }

    //Roda a função de atualizar totalizadores quando alterar a quantidade do item
    $("input[name='qtde']").change(function () {
        atualizarCarrinho();
    });

    $(".product_drag").on('dragstart', function (e) {
        e.originalEvent.dataTransfer.setData("id", $(this).attr("id"));
    });

    $(".product_drag_area").on('dragover', function () {
        $(this).addClass('product_drag_over');
        return false;
    });

    $(".product_drag_area").on('drop', function (e) {
        e.preventDefault();
        let id = e.originalEvent.dataTransfer.getData('id');
        $("#" + id).appendTo($(this));
        atualizarCarrinho();
    });
});