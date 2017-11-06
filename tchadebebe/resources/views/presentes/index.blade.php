@extends('layouts.base')

@section('title')
    @parent - Lista de Presentes
@stop

@section('content')
    <h1>Presentes</h1>
    <hr>

    <p>[ {!! HTML::link(action('PresentesController@create'), 'Cadastrar presente') !!} ]</p>
    @foreach($presentes as $presente)
        <p>
            <a href="{{ action('PresentesController@edit', ['id' => $presente->id]) }}">
                {{ $presente->titulo }}
            </a>
        </p>
    @endforeach
@stop