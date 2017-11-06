@extends('layouts.pretty-layout')

@section('title')
    @parent - Lista de Presentes
@stop

@section('content')

    <div class="col-xs-12">
        <div class="home-logo-top center-block text-center" style="padding-top: 150px;">
            @if ($usuario->isAdmin())
                <a href="admin">Área Administrativa</a>
            @endif
        </div>
    </div>
    <div class="col-xs-12">
        <div class="col-xs-12 text-center center-block" style="padding-bottom: 20px;">
            <h1>Lista do Bebê!</h1>

            <p class="lista-presentes-info">
            Clique para escolher o presente.
            <br>
            (Assim, ninguém leva presente repetido)
            </p>
        </div>
        <div class="col-xs-12">
            @if (count($usuario->presentes) > 0)
                <div class="col-xs-12 meus-presentes-container text-center center-block">
                    <div class="categoria">
                        <h4><strong>Presentes escolhidos:</strong></h4>
                        @foreach($usuario->presentes as $presente)
                            <p><strong>{{$presente->pivot->quantidade}}x</strong> {{ $presente->titulo }}
                                (<a href="{{action('PresentesController@desmarcar', ['id' => $presente->id]) }}" style="font-size: smaller;">
                                    Remover 1x
                                </a>)
                            </p>
                        @endforeach
                    </div>
                </div>
            @endif
            <div class="lista-presentes-content text-center center-block">
                @include('errors.list')
                    @foreach($categorias as $categoria => $presentes)
                        <div class="col-xs-12 categoria-container">
                            <div class="categoria">
                                <h4><strong>{{ $categoria }}</strong></h4>
                                @foreach($presentes as $presente)
                                    <p>
                                        <a href="
                                            @if ($presente->podeMarcar())
                                                {{ action('PresentesController@marcar', ['id' => $presente->id]) }}
                                            @else
                                                #?
                                            @endif
                                                "
                                                data-toggle="popover" data-placement="right" data-img="{{ $presente->url_imagem }}"
                                                data-trigger="hover"
                                            @if (!$presente->podeMarcar())
                                                class="desativado"
                                            @endif
                                            ><strong>{{ $presente->quantidadeRestante() }}x</strong> {{ $presente->titulo }}</a>

                                        @if ($usuario->marcouPresente($presente))

                                        @endif
                                    </p>
                                @endforeach
                            </div>
                        </div>
                    @endforeach
                {{--</table>--}}
            </div>
            <div class="col-xs-12 categoria-container text-center center-block">
                <div class="categoria">
                    <h4><strong>Caso prefira comprar on-line:</strong></h4>
                    <p>Endereço para entrega dos presentes:</p>
                    <p   class="center-block endereco">
                        Rua Fernando Correa 331<br>
                        Centro Chapada dos Guiamarães<br>
                        Mato Grosso<br>
                        CEP: 78.195-000
                    </p>
                    <p>Obs.: Como o bebê chegará apenas em OUTUBRO, vale a pena conferir alguns sites com BONS PREÇOS:</p>
                    {{--<p><em>Não temos muita pressa para os presentes pois o bebê chegará apenas em OUTUBRO.</em></p>--}}
                    {{--<p>Vale a pena conferir os preços em alguns sites estrangeiros ou brasileiros--}}
                        {{--para conseguir BONS PREÇOS.--}}
                    {{--</p>--}}
                    <p><strong>Internacionais:</strong><a href="http://www.amazon.com">Amazon</a>,
                        <a href="http://www.ebay.com">Ebay</a>, <a href="http://www.babiesrus.com/">Babies R us</a>,
                        <a href="http://www.buybuybaby.com/">Buy Buy Baby</a>
                        <br>
                        <strong>Nacionais:</strong><a href="http://www.bebestore.com.br/">Bebê Store</a>,
                        <a href="http://www.walmart.com.br/">Walmart</a>,
                        <a href="http://www.americanas.com.br/">Americanas</a>,
                        <a href="http://www.tricae.com.br/">Tricae</a>
                    </p>
                </div>
            </div>
            <div class="text-center center-block col-xs-12">
                <p>
                    <a href="?#" class="btn btn-default" id="concluir">Concluir</a>
                </p>
            </div>
            <div class="modal fade" id="alerta-concluir">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Muito Obrigado!</h4>
                        </div>
                        <div class="modal-body">
                            <p>Seus presentes foram registrados. Você pode alterar sua escolha a qualquer momento acessando este site novamente.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Voltar</button>
                            <a href="/sair" class="btn btn-primary btn-white-text">Confirmar</a>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
        </div>
    </div>
@stop

@section('js')
    @parent
    <script>
        $(function() {
            $('[data-toggle=popover]').popover({
                html: true,
                trigger: 'hover',
                content: function () {
                    return '<img src="' + $(this).data('img') + '" width="200px" />';
                }
            });

            var image;
            {{-- Image Pre Loader --}}
            @foreach($presentes as $presente)
                image = new Image(50,50);
                image.src = "{{ $presente->url_imagem }}";
            @endforeach
        });
    </script>
@stop