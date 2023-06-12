import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {CommonModule} from "@angular/common";
import {ITask} from "../model/task";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inProgress: ITask[] = [];
  done: ITask[] = [];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    });
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
