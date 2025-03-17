<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tasks;
use Illuminate\Console\View\Components\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class tasksController extends Controller
{
    public function index()
    {
        $tasks = Tasks::all();

        $data = [
            'tasks' => $tasks,
            'status' => 200
        ];

        return response()-> json($data, 200);
    }


    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $task = Tasks::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status
        ]);

        if (!$task) {
            return response()->json([
                'message' => 'Error al crear la tarea',
                'status' => 500
            ], 500);
        }

        return response()->json([
            'task' => $task,
            'message' => 'Tarea creada con éxito',
            'status' => 201
        ], 201);
    }

    public function show($id) {
        $task = Tasks::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Tarea no encontrada',
                'status' => 404
            ], 404);
        }

        return response()->json([
            'task' => $task,
            'status' => 200
        ], 200);
    }

    public function destroy($id) {
        $task = Tasks::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Tarea no encontrada',
                'status' => 404
            ], 404);
        }

        $task->delete();

        return response()->json([
            'message' => 'Tarea eliminada correctamente',
            'status' => 200
        ], 200);
    }

    public function update(Request $request, $id) {
        $task = Tasks::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Tarea no encontrada',
                'status' => 404
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'status' => 'sometimes|required|in:pending,in_progress,completed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $task->update($request->all());

        return response()->json([
            'message' => 'Tarea actualizada correctamente',
            'task' => $task,
            'status' => 200
        ], 200);
    }


}
