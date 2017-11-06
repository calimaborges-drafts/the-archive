<?php

namespace App\Http\Requests;



class PresenteRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'titulo' => 'required',
            'url_imagem' => ['required','url'],
            'quantidade' => ['required', 'numeric'],
            'categoria' => ['required']
        ];
    }
}
