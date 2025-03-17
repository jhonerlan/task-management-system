import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  taskId?: number;
  isLoading = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      this.loadTask(this.taskId);
    }
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: ['pending', Validators.required]
    });
  }

  loadTask(id: number): void {
    this.isLoading = true;
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status
        });
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

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.markFormGroupTouched(this.taskForm);
      return;
    }

    const task: Task = this.taskForm.value;
    this.isSubmitting = true;

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(this.taskId, task).subscribe({
        next: () => {
          this.snackBar.open('Tarea actualizada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.isSubmitting = false;
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error updating task', error);
          this.snackBar.open('Error al actualizar la tarea', 'Cerrar', {
            duration: 3000
          });
          this.isSubmitting = false;
        }
      });
    } else {
      this.taskService.createTask(task).subscribe({
        next: () => {
          this.snackBar.open('Tarea creada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.isSubmitting = false;
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error creating task', error);
          this.snackBar.open('Error al crear la tarea', 'Cerrar', {
            duration: 3000
          });
          this.isSubmitting = false;
        }
      });
    }
  }

  // Marcar todos los campos como tocados para mostrar errores de validación
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
