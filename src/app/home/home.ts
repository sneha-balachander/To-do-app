import { Component, signal } from '@angular/core';
import { Greeting } from '../greeting/greeting';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Greeting, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  message = signal("Hello! Welcome to the To-do App");
}
