<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AttendanceLog;

class AttendanceLogController extends Controller
{
    public function index()
    {
        return AttendanceLog::with('employee', 'workStatus')->get();
    }

}
