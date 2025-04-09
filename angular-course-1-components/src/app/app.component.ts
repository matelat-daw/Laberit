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
    startDate = new Date(2025, 0, 1);
    title = COURSES[0].description;
    price = 9.989898;
    rate = .25;
    // courses = [];
    coreCourse = COURSES[0];
    // rxjsCourse = COURSES[1];
    // ngrxCourse = COURSES[2];

    onCourseSelected(course: Course)
    {
        console.log('Card Clicked: ', course);
    }
}