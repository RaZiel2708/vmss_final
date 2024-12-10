import { Component, OnInit } from '@angular/core';
import { Underwriter } from '../underwriter'; 
import { UnderwriterService } from '../services/underwriter.service';

@Component({
  selector: 'app-viewunder',
  standalone: false,
  
  templateUrl: './viewunder.component.html',
  styleUrl: './viewunder.component.css'
})
export class ViewunderComponent implements OnInit {
  id:string=''

  underwriters: Underwriter[] = [];  // Use the Underwriter type for the array

  constructor(private underwriterService: UnderwriterService) { }

  ngOnInit(): void {
    // Fetch data from the service on component initialization
    this.underwriterService.getUnderwriters().subscribe(data => {
      this.underwriters = data;
      console.log(data)
    });
  }

  // Delete an underwriter row
  deleteUnderwriter(id: string): void {
    this.underwriterService.deleteUnderwriter(id).subscribe(() => {
      // Remove the deleted underwriter from the array
      this.underwriters = this.underwriters.filter(underwriter => underwriter.id !== id);
    });
  }
}
