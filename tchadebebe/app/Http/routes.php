<?php

get('/acesso', 'AuthController@getLogin');
post('/acesso', 'AuthController@postLogin');
get('/sair', 'AuthController@getLogout');

Route::group(['middleware' => 'auth'], function() {
    get('/', 'PresentesController@listaHome');
    get('/presentes/marcar/{id}', 'PresentesController@marcar');
    get('/presentes/desmarcar/{id}', 'PresentesController@desmarcar');
});

Route::group(['middleware' => 'auth.admin'], function() {
    get('/admin', 'AdminController@index');
    resource('presentes', 'PresentesController');
});

