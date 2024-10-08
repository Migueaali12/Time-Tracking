<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function checkValidator($validator)
    {
        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos en la petición',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }
        return null;
    }

    public function registerUser(Request $request)
    {

        try {

            $validateUser = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'lastname' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|min:8|confirmed',
            ]);

            $validationErrorResponse = $this->checkValidator($validateUser);
            if ($validationErrorResponse) {
                return $validationErrorResponse;
            }

            $user = User::create([
                'name' => $request->name,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'USER',
            ]);

            $data = [
                'status' => 200,
                'message' => 'Usuario registrado exitosamente',
            ];

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }


    public function loginUser(Request $request)
    {
        try {

            $validateUser = Validator::make(
                $request->all(),
                [
                    'email' => 'required|string|email|max:255',
                    'password' => 'required',
                ]
            );

            $validationErrorResponse = $this->checkValidator($validateUser);
            if ($validationErrorResponse) {
                return $validationErrorResponse;
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json(['message' => 'Credenciales inválidas'], 401);
            }

            $user = User::where('email', $request->email)->first();

            $data = [
                'role' => $user->role,
                'status' => 200,
                'message' => 'Inicio de sesión exitoso',
                'token' => $user->createToken('USER TOKEN')->plainTextToken
            ];

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function validateToken(Request $request)
    {
        try {

            $token = $request->bearerToken();

            if (!$token) {
                $data = [
                    'error' => 'Token no proporcionado',
                    'status' => 401
                ];

                return response()->json($data, 401);
            }

            $user = \Laravel\Sanctum\PersonalAccessToken::findToken($token);

            if (!$user) {
                $data = [
                    'error' => 'Token invalido',
                    'status' => 401
                ];

                return response()->json($data, 401);
            }

            $data = [
                'status' => 200,
                'message' => 'Token válido',
                'user' => $user->tokenable
            ];

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'error' => 'Error al validar el token',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function logoutUser(Request $request)
    {

        try {

            $request->user()->tokens()->delete();

            $data = [
                'status' => 200,
                'message' => 'Cierre de sesión exitoso',
            ];

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'error' => 'Error al intentar cerrar la sesión',
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
