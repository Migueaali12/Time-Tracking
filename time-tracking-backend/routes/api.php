<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\EmployeeController;

Route::prefix('user')->group(function () {
    Route::post('/register', [UserController::class, 'registerUser']);
    Route::post('/login', [UserController::class, 'loginUser']);
    Route::get('/validate-token', [UserController::class, 'validateToken']);
    Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logoutUser']);
});

Route::prefix('employee')->group(function () {
    Route::get('/', [EmployeeController::class, 'getEmployee']);
});

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });
// });


