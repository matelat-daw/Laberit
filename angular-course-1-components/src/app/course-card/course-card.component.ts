import {
  AfterContentInit,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  ElementRef,
  OnInit,
  QueryList, TemplateRef,
  ViewChild
} from '@angular/core';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input()
  course: Course;

  @Input({ required: true })
  index: number;

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

  cardClasses()
  {
    if (this.course.category == 'BEGINNER') {
      return 'beginner';
    }
  }

  cardStyles()
  {
    return {'text-decoration': 'underline'};
  }

}