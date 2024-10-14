<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
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

    public function defaultMessage($message, $status)
    {
        $data = [
            'message' => $message,
            'status' => $status,
        ];

        return $data;
    }

    public function getEmployee()
    {
        $employees = Employee::all();

        if (!$employees) {
            $data = [
                'message' => 'No se encontraron empleados',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'employees' => $employees,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function addEmployee(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:ACTIVE,INACTIVE',
            'name' => 'required|string',
            'lastname' => 'required|string',
            'dni' => 'required|max:15',
            'phone' => 'required|max:15',
            'email' => 'required|email',
            'face_image_path' => 'string',
            'face_encoding' => 'string',
            'position_id' => 'integer|in:1,2'
        ]);

        $validatorResponse = $this->checkValidator($validator);
        if ($validatorResponse) {
            return $validatorResponse;
        }

        $employee = Employee::create([
            'status' => $request->status,
            'name' => $request->name,
            'lastname' => $request->lastname,
            'dni' => $request->dni,
            'phone' => $request->phone,
            'email' => $request->email,
            'face_image_path' => $request->face_image_path,
            'face_encoding' => $request->face_encoding,
            'position_id' => $request->position_id
        ]);

        if (!$employee) {
            $data = [
                'message' => 'Error al crear el empleado',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $response = $this->defaultMessage($message = 'Empleado creado con exito', $status = 200);
        return response()->json($response, 200);
    }

    public function deleteEmployee(Request $request) {
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|integer'
        ]);

        $validatorResponse = $this->checkValidator($validator);
        if ($validatorResponse) {
            return $validatorResponse;
        }

        $employee = Employee::find($request->employee_id);

        if (!$employee) {
            $response = $this->defaultMessage($message = 'Empleado no encontrado', $status = 404);
            return response()->json($response, 404);
        }

        $employee->delete();

        $response = $this->defaultMessage($message = 'Empleado eliminado con éxito', $status = 200);
        return response()->json($response, 200);
    }
}
