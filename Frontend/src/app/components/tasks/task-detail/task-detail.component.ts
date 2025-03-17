import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTask(+id);
    }
  }

  loadTask(id: number): void {
    this.isLoading = true;
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.task = task;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching task', error);
        this.snackBar.open('Error al cargar la tarea', 'Cerrar', {
          duration: 3000
        });
        this.isLoading = false;
        this.router.navigate(['/tasks']);
      }
    });
  }

  deleteTask(): void {
    if (!this.task || !this.task.id) return;

    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.taskService.deleteTask(this.task.id).subscribe({
        next: () => {
          this.snackBar.open('Tarea eliminada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error deleting task', error);
          this.snackBar.open('Error al eliminar la tarea', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  updateStatus(status: string): void {
    if (!this.task || !this.task.id) return;

    const updatedTask: Task = { ...this.task, status };

    this.taskService.updateTask(this.task.id, updatedTask).subscribe({
      next: (task) => {
        this.task = task;
        this.snackBar.open('Estado actualizado con éxito', 'Cerrar', {
          duration: 3000
        });
      },
      error: (error) => {
        console.error('Error updating task status', error);
        this.snackBar.open('Error al actualizar el estado', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in_progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'in_progress':
        return 'En Progreso';
      case 'completed':
        return 'Completada';
      default:
        return status;
    }
  }
}
