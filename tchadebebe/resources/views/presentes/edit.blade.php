@extends('layouts.base')

@section('title')
    @parent - Edição de Presentes
@stop

@section('content')
    <h1>Presentes</h1>
    <hr>

    @include('messages.list')
    @include('errors.list')

    {!! Form::model($presente, ['method' => 'PATCH', 'action' => ['PresentesController@update', $presente->id]]) !!}
        @include('presentes._form', ['textoBotaoAcao' => 'Alterar Presente'])
    {!! Form::close() !!}
@stop