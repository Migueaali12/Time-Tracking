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

    public function defaultMessage($message, $employees, $status)
    {
        $data = [
            'message' => $message,
            'employees' => $employees,
            'status' => $status,
        ];

        return $data;
    }

    public function getEmployee()
    {
        $employees = Employee::all();

        if (!$employees) {
            $response = $this->defaultMessage($message = 'No se encontraron empleados', $employees, $status = 404);
            return response()->json($response, 404);
        }

        $response = $this->defaultMessage($message = '', $employees, $status = 200);
        return response()->json($response, 200);
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
            $response = $this->defaultMessage($message = 'Error al crear empleado', $employee, $status = 200);
            return response()->json($response, 500);
        }

        $response = $this->defaultMessage($message = 'Empleado creado con exito', $employee, $status = 200);
        return response()->json($response, 200);
    }

    public function deleteEmployee(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|integer'
        ]);

        $validatorResponse = $this->checkValidator($validator);
        if ($validatorResponse) {
            return $validatorResponse;
        }

        $employee = Employee::find($request->employee_id);

        if (!$employee) {
            $response = $this->defaultMessage($message = 'Empleado no encontrado', $employee, $status = 404);
            return response()->json($response, 404);
        }

        $employee->delete();

        $response = $this->defaultMessage($message = 'Empleado eliminado con éxito', $employee, $status = 200);
        return response()->json($response, 200);
    }

    public function updateEmployee($id, Request $request)
    {

        $employee = Employee::find($request->id);

        if (!$employee) {
            $response = $this->defaultMessage($message = 'Empleado no encontrado', $employee, $status = 404);
            return response()->json($response, 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'nullable|in:ACTIVE,INACTIVE',
            'name' => 'nullable|string',
            'lastname' => 'nullable|string',
            'dni' => 'nullable|max:15',
            'phone' => 'nullable|max:15',
            'email' => 'nullable|email',
            'face_image_path' => 'nullable|string',
            'face_encoding' => 'nullable|string',
            'position_id' => 'nullable|integer|in:1,2'
        ]);

        $validatorResponse = $this->checkValidator($validator);
        if ($validatorResponse) {
            return $validatorResponse;
        }

        $employee->fill($request->only([
            'status',
            'name',
            'lastname',
            'dni',
            'phone',
            'email',
            'face_image_path',
            'face_encoding',
            'position_id'
        ]));

        $employee->save();

        $response = $this->defaultMessage($message = 'Empleado actualizado con éxito', $employee, $status = 200);
        return response()->json($response, 200);
    }
}
