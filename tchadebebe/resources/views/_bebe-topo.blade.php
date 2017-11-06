<div class="col-sm-12">
    <div class="home-logo-top center-block text-center">
        <img src="dino-baby.png" class="img-responsive center-block"/>
    </div>
</div>
<div class="col-sm-12">
    <h1 class="center-block text-center">Estou chegando e já quero festa!</h1>
</div>
<div class="col-sm-12" style="padding-top: 40px;">
    <div class="col-sm-4 text-center">
        <p>Por isso, espero você no dia 12 de julho às 18hs,
            <br>
            para o meu <strong>Chá de Bebê</strong>!!
        </p>

        <p>
            <strong>Onde?</strong> Av. CPA, 3085 - Condomínio Maison France
            <br>
            (em frente ao Shopping Pantanal)
        </p>

        @if ($usuario && $usuario->isAdmin())
            <a href="/admin">Área Administrativa</a>
        @endif
    </div>
    <div class="col-sm-4 text-center">
        <p>Sugestão: Trazer um pacote de fraldas.</p>

        <p>Caso deseje colaborar mais acesse a</p>

        <p><strong>Lista do Bebê</strong>!</p>
    </div>
    <div class="col-sm-4 text-center">
        <div class="lista-presentes-info center-block text-center">
            <p>
                Por favor, preencha seu email e o código informado no convite.
            </p>
        </div>

        <div class="lista-presentes-content center-block text-center">
            @include('errors.list')

            {!! Form::open(['url' => 'acesso']) !!}
            <div class="form-group">
                {!! Form::label('email', 'Email:') !!}
                {!! Form::text('email', null, ['class' => 'form-control']) !!}
            </div>
            <div class="form-group">
                {!! Form::label('codigo', 'Código:') !!}
                {!! Form::password('codigo', ['class' => 'form-control']) !!}
            </div>
            <div class="form-group">
                {!! Form::submit('Acessar', ['class' => 'btn btn-success form-control']) !!}
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>