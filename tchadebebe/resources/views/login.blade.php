@extends('layouts.pretty-layout')

@section('title')
    @parent
@stop

@section('content')
    <div class="col-sm-12">
        <div class="home-logo-top center-block text-center">
            <img src="dino-baby-sem-texto.png" class="img-responsive center-block"/>
            <h1>É um menino!</h1>
        </div>
    </div>
    <div class="col-sm-12">
        <h1 class="center-block text-center">Estou chegando e já quero festa!</h1>
    </div>
    <div class="col-sm-12" style="padding-top: 40px;">
        <div class="col-sm-4">
            <p>Por isso, espero você no meu <strong>Chá de Bebê</strong>!</p>
            <p><strong>Data:</strong> - - -.</p>
            <p>
                <strong>Local: </strong> - - -
            </p>

            {{--@if ($usuario && $usuario->isAdmin())--}}
                {{--<a href="/admin">Área Administrativa</a>--}}
            {{--@endif--}}
        </div>
        <div class="col-sm-4 text-center">
            <p><strong>Sugestão de presente:</strong></p>
            <p>Trazer um pacote de fraldas.</p>
            <p>Caso deseje colaborar mais acesse ao lado a Lista do Bebê &#8594;</p>
        </div>
        <div class="col-sm-4 text-center">
            <div class="center-block text-center">
                {!! Form::open(['url' => 'acesso']) !!}
                <div class="form-group">
                    {!! Form::label('email', 'Seu email:') !!}
                    {!! Form::text('email', null, ['class' => 'form-control']) !!}
                </div>
                <div class="form-group">
                    {!! Form::label('codigo', 'Código (informado no convite):') !!}
                    {!! Form::password('codigo', ['class' => 'form-control']) !!}
                </div>
                <div class="form-group">
                    {!! Form::submit('Acessar a lista do bebê', ['class' => 'btn btn-success form-control']) !!}
                </div>
                {!! Form::close() !!}
                @include('errors.list')
            </div>
        </div>

        {{--<p class="lista-presentes-info ">--}}
        {{--Passe o mouse no nome do item,--}}
        {{--<br>--}}
        {{--caso deseje visualizar mais detalhes.--}}
        {{--</p>--}}

        {{--<p class="lista-presentes-info">--}}
        {{--Clique para marcar o presente escolhido.--}}
        {{--<br>--}}
        {{--(Assim, ninguém leva presente repetido)--}}
        {{--</p>--}}
    </div>
@stop
