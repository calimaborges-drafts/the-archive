<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;

    protected $emailsAutenticados = [];

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'usuarios';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['email'];

    /**
     * @return bool
     */
    public function isAdmin() {
        return in_array($this->email, $this->emailsAutenticados);
    }

    /**
     * @param Presente $presente
     * @return bool
     */
    public function marcouPresente(Presente $presente) {
        $presente = $this->presentes()->where('presente_id', '=', $presente->id)->first();

        return !is_null($presente);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function presentes() {
        return $this->belongsToMany(Presente::class, 'usuario_presente', 'usuario_id', 'presente_id')->withPivot('quantidade')->withTimestamps();
    }
}
