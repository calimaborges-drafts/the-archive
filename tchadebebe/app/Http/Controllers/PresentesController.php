<?php

namespace App\Http\Controllers;

use App\Guard;
use App\Http\Requests\PresenteRequest;
use App\Http\Requests;
use App\Presente;
use Illuminate\Http\Response;


class PresentesController extends Controller
{
    /**
     * @var Guard
     */
    protected $guard;

    public function __construct(Guard $guard) {
        $this->guard = $guard;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return redirect('/admin');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        $presente = new Presente;
        $presente->quantidade = 1;
        return view('presentes.create')->with(compact('presente'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param PresenteRequest $request
     * @return Response
     */
    public function store(PresenteRequest $request)
    {
        $presente = Presente::create($request->all());
        session()->flash('flash_message', 'Presente criado com sucesso!');
        return redirect("presentes/$presente->id/edit");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        $presente = Presente::findOrFail($id);
        return view('presentes.edit')->with(compact('presente'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @param PresenteRequest $request
     * @return Response
     */
    public function update($id, PresenteRequest $request)
    {
        $presente = Presente::findOrFail($id);
        $presente->update($request->all());
        session()->flash('flash_message', 'Presente atualizado com sucesso!');
        return redirect("presentes/$presente->id/edit");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $presente = Presente::findOrFail($id);
        $presente->delete();

        return 1;
    }

    // METODOS DA PARTE HOME

    /**
     * Lista presentes de forma mais bonita
     *
     * @return Response
     */
    public function listaHome() {
        $categorias = Presente::listarCategorias();
        $usuario = $this->guard->user();
        return view('presentes.lista-home')->with(compact('categorias', 'usuario'));
    }


    /**
     * Marca um presente para ser dado
     *
     * @param int $id
     * @return Response
     */
    public function marcar($id) {
        $usuario = $this->guard->user();

        /** @var Presente $presente */
        $presente = Presente::find($id);

        if (!$presente->podeMarcar()) {
            return redirect('/')->withErrors([
                'Alguém selecionou o presente antes de você :-('
            ]);
        }


        $presente = $usuario->presentes()->where('presente_id', '=', $id)->first();

        if (!$presente) {
            $usuario->presentes()->attach($id, ['quantidade' => 1]);
        } else {
            $presente->pivot->quantidade = $presente->pivot->quantidade + 1;
            $presente->pivot->save();
        }

        return redirect('/');
    }

    /**
     * Remove um presente da lista do usuário
     *
     * @param int $id
     * @return Response
     */
    public function desmarcar($id) {
        $usuario = $this->guard->user();
        $presente = $usuario->presentes()->where('presente_id', '=', $id)->first();

        if ($presente == null) {
            return redirect('/');
        }

        if ($presente->pivot->quantidade <= 1) {
            $usuario->presentes()->detach($id);
        } else {
            $presente->pivot->quantidade = $presente->pivot->quantidade - 1;
            $presente->pivot->save();
        }

        return redirect('/');
    }
}
