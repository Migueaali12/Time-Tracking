<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EmployeeController;

Route::prefix('user')->group(function () {
    Route::post('/register', [UserController::class, 'registerUser']);
    Route::post('/login', [UserController::class, 'loginUser']);
    Route::get('/validate-token', [UserController::class, 'validateToken']);
    Route::post('/logout', [UserController::class, 'logoutUser'])->middleware('auth:sanctum');
});

Route::prefix('employee')->group(function () {
    Route::middleware('auth:sanctum')->get('/', [EmployeeController::class, 'getEmployee']);
    Route::middleware('auth:sanctum')->post('/add', [EmployeeController::class, 'addEmployee']);
    Route::middleware('auth:sanctum')->post('/delete', [EmployeeController::class, 'deleteEmployee']);
});


// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });
// });


