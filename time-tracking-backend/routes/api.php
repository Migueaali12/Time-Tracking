<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

Route::post('/auth/register', [UserController::class, 'registerUser']);
Route::post('/auth/login', [UserController::class, 'loginUser']);

// Rutas protegidas por Sanctum (requieren autenticación con token)
// Rutas protegidas por Sanctum (requieren autenticación con token)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();  // Devuelve el usuario autenticado
    });
    
    // Otras rutas protegidas por el middleware de Sanctum
});