<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkStatusesRelated extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'work_statuses_relateds';

    protected $fillable = ['work_status_id', 'work_status_related_id', 'status'];
}
