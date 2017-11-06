@extends('layouts.base')

@section('css')
    @parent
    <style>
        body {
            background: url("background.svg") repeat-x;
        }

        .home-logo-top {
            margin-top: 0px;
        }

        .lista-presentes-title {
            font-size: x-large;
        }

        .lista-presentes-content {
            padding-top: 40px;
        }

        .lista-presentes-info {
            font-size: smaller;
            color: #777777;
        }

        /* unvisited link */
        a:link {
            color: #956236;
        }

        /* visited link */
        a:visited {
            color: #956236;
        }

        /* mouse over link */
        a:hover {
            color: #956236;
        }

        /* selected link */
        a:active {
            color: #956236;
        }

        a.desativado {
            text-decoration: line-through;
        }

        a.btn-white-text {
            color: #ffffff;
        }
    </style>
@stop