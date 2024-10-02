<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkStatus extends Model
{
    use HasFactory;

    protected $fillable = ['status', 'name', 'reference_status'];

    public function attendanceLogs()
    {
        return $this->hasMany(AttendanceLog::class);
    }

    public function relatedWorkStatuses()
    {
        return $this->belongsToMany(WorkStatus::class, 'work_statuses_relateds', 'work_status_id', 'work_status_related_id');
    }
}
