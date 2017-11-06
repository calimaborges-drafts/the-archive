<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterPresentesTableAddCategoria extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('presentes', function (Blueprint $table) {
            $table->string("categoria")->default("Outros");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('presentes', function (Blueprint $table) {
            $table->dropColumn("categoria");
        });
    }
}
