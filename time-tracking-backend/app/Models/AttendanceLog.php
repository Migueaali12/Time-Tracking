<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceLog extends Model
{
    use HasFactory;

    protected $fillable = ['status', 'datetime', 'notes', 'employee_id', 'work_status_id'];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function workStatus()
    {
        return $this->belongsTo(WorkStatus::class);
    }
}
