<?php

namespace App\Http\Controllers;

use App\Presente;
use App\User;

class AdminController extends Controller {

    public function index() {
        $categorias = Presente::listarCategorias();
        $usuarios = User::all();
        return view('admin.index')->with(compact('usuarios','categorias'));
    }
}