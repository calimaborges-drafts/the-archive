<div class="form-group col-sm-12">
    {!! Form::label('titulo', 'Titulo:') !!}
    {!! Form::text('titulo', null, ['class' => 'form-control']) !!}
</div>

<div class="form-group col-sm-12">
    {!! Form::label('quantidade', 'Quantidade:') !!}
    {!! Form::text('quantidade', null, ['class' => 'form-control']) !!}
</div>

<div class="form-group col-sm-12">
    {!! Form::label('categoria', 'Categoria:') !!}
    {!! Form::text('categoria', null, ['class' => 'form-control']) !!}
</div>

<div class="form-group col-sm-12">
    {!! Form::label('url_imagem', 'URL da Imagem:') !!}
    {!! Form::text('url_imagem', null, ['class' => 'form-control']) !!}
</div>


@if($presente->url_imagem)
    <div class="form-group">
        <img src="{{$presente->url_imagem}}" class="imagem-presente center-block thumbnail">
    </div>
@endif

<div class="form-group">
    <div class="col-sm-3">
        <a href="{{ url('presentes') }}" class="btn btn-default form-control">Voltar</a>
    </div>

    <div class="col-sm-3">
        <a href="{{ url('presentes', $presente->id) }}" data-method="delete"
           data-message="Tem certeza que deseja apagar o presente?"
           data-redirect="{{ url('presentes') }}"
           class="btn btn-danger form-control">Apagar</a>
    </div>

    <div class=" col-sm-6">
        {!! Form::submit($textoBotaoAcao, ['class' => 'btn btn-primary form-control']) !!}
    </div>
</div>
