<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterPresentesTableAddQuantidade extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('presentes', function (Blueprint $table) {
            $table->integer("quantidade")->default(1)->unsigned();
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
            $table->dropColumn("quantidade");
        });
    }
}
