<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="favicon.ico">

    <title>
        @section('title')
            Tcha de Bebe
        @show
    </title>

    @section('css')
        {!! HTML::style('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/css/bootstrap.min.css') !!}
        {!! HTML::style('css/app.css') !!}
    @show
</head>

<body>
<div class="container">
    @yield('content')

    <!-- Placed at the end of the document so the pages load faster -->
    @section('js')
        {!! HTML::script('https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js') !!}
        {!! HTML::script('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/js/bootstrap.min.js') !!}
        {!! HTML::script('js/app.js') !!}
    @show
</div>
</body>
</html>