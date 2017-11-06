<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarioPresenteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuario_presente', function (Blueprint $table) {
            $table->integer('usuario_id')->unsigned()->index();
            $table->foreign('usuario_id')->references('id')->on('usuarios')->onDelete('cascade');

            $table->integer('presente_id')->unsigned()->index();
            $table->foreign('presente_id')->references('id')->on('presentes')->onDelete('cascade');

            $table->integer('quantidade')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('usuario_presente');
    }
}
