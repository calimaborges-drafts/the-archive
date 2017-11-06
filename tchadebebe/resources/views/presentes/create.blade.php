@extends('layouts.base')

@section('title')
    @parent - Cadastro de Presentes
@stop

@section('content')
    <h1>Presentes</h1>
    <hr>

    @include('errors.list')
    @include('messages.list')

    {!! Form::model($presente, ['url' => 'presentes']) !!}
        @include('presentes._form', ['textoBotaoAcao' => 'Cadastrar Presente'])
    {!! Form::close() !!}
@stop