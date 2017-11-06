<?php
namespace App;


use Illuminate\Database\Eloquent\Model;

class Presente extends Model {
    protected $fillable = [
        'titulo',
        'url_imagem',
        'quantidade',
        'categoria'
    ];

    /**
     * @return bool
     */
    public function podeMarcar() {
        return $this->quantidadeRestante() > 0;
    }

    /**
     * @return int
     */
    public function quantidadeRestante() {
        $quantidadeRestante = $this->quantidade;
        $usuarios = $this->usuarios;

        foreach($usuarios as $usuario) {
            $quantidadeRestante -= $usuario->pivot->quantidade;
        }
        return $quantidadeRestante;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function usuarios() {
        return $this->belongsToMany(User::class, 'usuario_presente', 'presente_id', 'usuario_id')->withPivot('quantidade')->withTimestamps();
    }

    /**
     * @return array
     */
    public static function listarCategorias() {
        $presentes = Presente::orderBy('categoria')->orderBy('titulo')->get();

        $categorias = [];
        foreach ($presentes as $presente) {
            if (empty($categorias[$presente->categoria])) {
                $categorias[$presente->categoria] = [];
            }
            $categorias[$presente->categoria][] = $presente;
        }

        return $categorias;
    }
}