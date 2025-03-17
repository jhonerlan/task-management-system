<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\taskController;
use App\Http\Controllers\tasksController;

Route::get('/tasks', [tasksController::class, 'index']);

Route::post('/tasks', [TasksController::class, 'store']);

Route::get('/tasks/{id}', [TasksController::class, 'show']);

Route::put('/tasks/{id}', [TasksController::class, 'update']);

Route::delete('/tasks/{id}', [TasksController::class, 'destroy']);
