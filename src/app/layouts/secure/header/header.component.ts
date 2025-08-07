import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      let localData = JSON.parse(storedUsername);
      this.username = localData?.userName || '';
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
