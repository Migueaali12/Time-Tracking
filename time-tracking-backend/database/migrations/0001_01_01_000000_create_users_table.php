<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id(); 
                $table->string('name', 20); 
                $table->string('lastname', 20); 
                $table->string('email', 50)->unique(); 
                $table->string('password', 40);
                $table->enum('role', ['USER', 'ADMIN'])->default('USER'); 
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
