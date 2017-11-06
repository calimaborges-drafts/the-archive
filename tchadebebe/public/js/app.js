$(function() {
    $(function() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': $('[name="_token"]').val()
            }
        });
    });

    $('a[data-method=delete]').on('click', function(event) {
        event.preventDefault();
        var el = $(this);
        if (confirm(el.attr('data-message'))) {
            $.ajax({
                type: "DELETE",
                url: $(this).attr('href'),
                success: function(affectedRows) {
                    if (affectedRows > 0) window.location = el.attr('data-redirect');
                }
            });
        }
    });

    $('#concluir').on('click', function(event) {
        event.preventDefault();
        $('#alerta-concluir').modal();

        //if (confirm('Seus presentes foram selecionados. Você pode alterar sua escolha a qualquer momento acessando este site novamente. Muito Obrigado! :-)')) {
        //    window.location = '/logout';
        //}
    });
});

