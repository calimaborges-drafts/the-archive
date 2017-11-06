<?php
namespace App;

use \Illuminate\Contracts\Auth\Guard as GuardContract;
use Illuminate\Contracts\Config\Repository;

class Guard implements GuardContract {

    const kTokenCookie = 'tchoken';

    /**
     * @var \Illuminate\Http\Request;
     */
    protected $request;

    /**
     * The Illuminate cookie creator service.
     *
     * @var \Illuminate\Contracts\Cookie\QueueingFactory
     */
    protected $cookies;

    /**
     * @var string uniquePassword
     */
    protected $codigoUnico;

    /**
     * @param Repository $config
     */
    public function __construct(Repository $config) {
        $this->codigoUnico = $config->get('sistema.codigo');
        $this->cookies = app('cookie');
        $this->request = \Request::instance();
    }

    /**
     * Determine if the current user is authenticated.
     *
     * @return bool
     */
    public function check()
    {
        return !is_null($this->user());
    }

    /**
     * Determine if the current user is a guest.
     *
     * @return bool
     */
    public function guest()
    {
        return !$this->check();
    }

    /**
     * Get the currently authenticated user.
     *
     * @return \App\User|null
     */
    public function user()
    {
        $codigo = $this->tokenInfo('codigo');
        if (!$codigo || $codigo != $this->codigoUnico) {
            return null;
        }

        $email = $this->tokenInfo('email');
        return $this->getOrCreateUser($email);

    }

    /**
     * @param $email
     * @return User
     */
    protected function getOrCreateUser($email) {
        $email = strtolower($email);
        $user = User::where('email','=',$email)->first();
        if ($user == null) {
            $user = new User;
            $user->email = $email;
            $user->save();
        }

        return $user;
    }

    /**
     * @param string $key
     * @return null|string
     */
    protected function tokenInfo($key = null) {
        $cookie = $this->request->cookies->get(self::kTokenCookie);

        if (!$cookie) {
            return null;
        }

        $info = json_decode(base64_decode($cookie));

        if (is_null($key)) {
            return $info;
        } else {
            return $info->$key;
        }
    }

    /**
     * Log a user into the application without sessions or cookies.
     *
     * @param  array $credentials
     * @return bool
     */
    public function once(array $credentials = [])
    {
        throw new \League\Flysystem\NotSupportedException();
    }

    /**
     * Attempt to authenticate a user using the given credentials.
     *
     * @param  array $credentials
     * @param  bool $remember
     * @param  bool $login
     * @return bool
     */
    public function attempt(array $credentials = [], $remember = false, $login = true)
    {
        $email = $credentials['email'];
        $codigo = $credentials['codigo'];

        if ($codigo != $this->codigoUnico) {
            return false;
        }

        $user = $this->getOrCreateUser($email);
        if ($login) {
            $this->login($user);
        }

        return true;
    }

    protected function updateCookie(\Illuminate\Contracts\Auth\Authenticatable $user)
    {
        $cookieObject = [
            'email' => $user->email,
            'codigo' => $this->codigoUnico
        ];

        $forever = $this->cookies->forever(self::kTokenCookie, base64_encode(json_encode($cookieObject)));
        $this->cookies->queue($forever);
    }

    /**
     * Attempt to authenticate using HTTP Basic Auth.
     *
     * @param  string $field
     * @return \Symfony\Component\HttpFoundation\Response|null
     */
    public function basic($field = 'email')
    {
        throw new \League\Flysystem\NotSupportedException();
    }

    /**
     * Perform a stateless HTTP Basic login attempt.
     *
     * @param  string $field
     * @return \Symfony\Component\HttpFoundation\Response|null
     */
    public function onceBasic($field = 'email')
    {
        throw new \League\Flysystem\NotSupportedException();
    }

    /**
     * Validate a user's credentials.
     *
     * @param  array $credentials
     * @return bool
     */
    public function validate(array $credentials = [])
    {
        throw new \League\Flysystem\NotSupportedException();
    }

    /**
     * Log a user into the application.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable $user
     * @param  bool $remember
     * @return void
     */
    public function login(\Illuminate\Contracts\Auth\Authenticatable $user, $remember = false)
    {
        $this->updateCookie($user);
    }

    /**
     * Log the given user ID into the application.
     *
     * @param  mixed $id
     * @param  bool $remember
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    public function loginUsingId($id, $remember = false)
    {
        throw new \League\Flysystem\NotSupportedException();
    }

    /**
     * Determine if the user was authenticated via "remember me" cookie.
     *
     * @return bool
     */
    public function viaRemember()
    {
        throw new \League\Flysystem\NotSupportedException();
    }

    /**
     * Log the user out of the application.
     *
     * @return void
     */
    public function logout()
    {
        $this->cookies->queue($this->cookies->forget(self::kTokenCookie));
    }
}