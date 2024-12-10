import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-underwriter',
  standalone: false,
  
  templateUrl: './underwriter.component.html',
  styleUrl: './underwriter.component.css'
})
export class UnderwriterComponent {
  name:string |null=sessionStorage.getItem("name")
  constructor(private router:Router) {}
  ngOnInit(): void {
    const role = sessionStorage.getItem('role');
    // if (role !== 'underwriter') {
    //   this.router.navigate(['/login']); // Redirect unauthorized users
    // }

  }
}
