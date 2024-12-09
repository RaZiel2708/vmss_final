import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  isBlackNavBar: boolean = false;
  isAdminNavBar: boolean = false;
  isUnderwriterNavBar: boolean = false;
  isHomePage: boolean = true;
  showBackButton: boolean = false;
  currentUrl: string = '';

  constructor(
    private router: Router, 
    private location: Location
  ) {}

  ngOnInit() {
    const role = sessionStorage.getItem('role');
  // if (role !== 'admin') {
  //   this.router.navigate(['/login']);
  // }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
        this.setNavbarClass();
      }
    });
  }

  setNavbarClass(): void {
    this.isHomePage = this.router.url === "/";
    this.currentUrl = this.router.url; // Update currentUrl
  
    const excludedRoutes = ['/', '/admin', '/underwriter'];
    this.isBlackNavBar = !excludedRoutes.includes(this.currentUrl);
    this.isAdminNavBar = this.currentUrl === '/admin';
    this.isUnderwriterNavBar = this.currentUrl === '/underwriter';
    this.showBackButton = !excludedRoutes.includes(this.currentUrl);
  
    console.log('Current URL:', this.currentUrl);
    console.log('isHomePage:', this.isHomePage);
    console.log('isBlackNavBar:', this.isBlackNavBar);
    console.log('isAdminNavBar:', this.isAdminNavBar);
    console.log('isUnderwriterNavBar:', this.isUnderwriterNavBar);
    console.log('showBackButton:', this.showBackButton);
  }

  goBack(): void {
    if(this.router.url == '/login'){
      this.router.navigate(['/']);
    }
    else {
      this.location.back();
    }
  }
  logout() {
    sessionStorage.clear();
  // this.isHomePage = true;
  this.router.navigate(['/login'], { replaceUrl: true });
  }
}