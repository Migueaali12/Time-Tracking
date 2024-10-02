<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;

// Agrupar rutas de autenticación bajo el prefijo 'user'
Route::prefix('user')->group(function () {
    Route::post('/register', [authController::class, 'register']);
    Route::post('/login', [authController::class, 'login']);
    
    Route::middleware('auth:sanctum')->get('/', function (Request $request) {
        return $request->user();
    });
});
