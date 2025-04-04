import { Component } from '@angular/core';
import {COURSES} from '../db-data';
import { Course } from './model/course';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
    courses = COURSES;
    // courses = [];
    // coreCourse = COURSES[0];
    // rxjsCourse = COURSES[1];
    // ngrxCourse = COURSES[2];

    onCourseSelected(course: Course)
    {
        console.log('Card Clicked: ', course);
    }
}