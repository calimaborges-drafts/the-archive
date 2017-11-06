@extends('layouts.base')

@section('title')
    @parent - Administração
@stop

@section('content')
    <div class="col-sm-12">
        <div class="col-sm-12 center-block text-center">
            <a href="/">Voltar para o site principal</a>
        </div>
        <div class="col-sm-6 center-block text-center">
            <h1>Usuários</h1>
            @foreach($usuarios as $usuario)
                <p>
                    {{ $usuario->email }}
                    @if (1 == count($usuario->presentes))
                        (escolheu 1 presente)
                    @else
                        (escolheu {{count($usuario->presentes)}} presentes)
                    @endif
                </p>
            @endforeach
        </div>
        <div class="col-sm-6 center-block text-center">
            <h1>Presentes</h1>
            <p>[ {!! HTML::link(action('PresentesController@create'), 'Cadastrar presente') !!} ]</p>
            @foreach($categorias as $categoria => $presentes)
                <div class="col-sm-12 center-block text-center">
                    <div class="categoria">
                        <h3>{{ $categoria }}</h3>
                        @foreach($presentes as $presente)
                            <p>
                                <a href="{{ action('PresentesController@edit', ['id' => $presente->id]) }}">
                                    {{ $presente->titulo }}
                                </a>
                            </p>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>

    </div>
@stop