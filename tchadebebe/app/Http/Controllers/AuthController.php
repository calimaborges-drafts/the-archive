<?php

namespace App\Http\Controllers;

use App\Guard;
use Illuminate\Http\Request;

class AuthController extends Controller {

    public function getLogin() {
        return view('login');
    }

    public function postLogin(Request $request, Guard $auth) {
        $this->validate($request, [
            'email' => 'required|email', 'codigo' => 'required',
        ]);

        $credentials = $request->only('email', 'codigo');

        if ($auth->attempt($credentials, $request->has('remember'))) {
            return redirect()->intended('/');
        }

        return redirect('/acesso')
            ->withInput($request->only('email', 'remember'))
            ->withErrors([
                'Código de acesso inválido'
            ]);
    }

    public function getLogout(Guard $auth) {
        $auth->logout();
        return redirect('/');
    }
}