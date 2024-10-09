<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class employeeController extends Controller
{
    public function getEmployee()
    {
        $employees = Employee::all();

        if (!$employees) {
            $data = [
                'message' => 'No employees found',
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
}
