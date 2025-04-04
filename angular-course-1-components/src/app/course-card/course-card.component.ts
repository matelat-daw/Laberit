import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input()
  course?: Course;

  @Input({ required: true })
  index?: number;

  // @Output() // Espera que el Emitter tenga el mismo nombre que el custom event en la vista.
  @Output("courseSelected") // Le pasa el nombre del custom event en la vista al Emitter.
  courseEmitter = new EventEmitter<Course>();

  // constructor() {
  // }

  // ngOnInit() {
  // }

  onCourseViewed()
  {
    if (this.course) {
      console.log('Course viewed', this.course.id);
    } else {
      console.log('Course is undefined');
    }
    this.courseEmitter.emit(this.course);
  } 
}