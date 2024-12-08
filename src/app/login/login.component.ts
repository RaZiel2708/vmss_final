import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userDetils:any={
    
  }
  user:any={
    name:'',
    password:''
  }
  constructor(private http:HttpClient,private route:Router){}
  btn(){
    if(this.user.name!="" && this.user.password!=""){
      this.http.post(`http://localhost:8081/login/${this.user.name}/${this.user.password}`,null)
      .subscribe({
        next:(data:any) =>{
          // this.snackBar.open('login successfully','close',{
          //   duration:3000,
          //   horizontalPosition:'center',
          //   verticalPosition:'top'
          // })
          this.userDetils=data
          console.log(this.userDetils.role)
          sessionStorage.setItem('role', this.userDetils.role);
          sessionStorage.setItem('name',this.userDetils.name);
          sessionStorage.setItem('id',this.userDetils.id);
          if(this.userDetils.role=="admin"){
             this.route.navigate(['/admin'])
          } 
          if(this.userDetils.role=="user"){
            this.route.navigate(['/underwriter'])
          }
          if(this.userDetils.password==="Employee123"){
            this.route.navigate(['/updatepassword'])
          }
        },
        error:(error:any)=>{
          console.log(error)
        }
      })
    } 
    // else {
    //   this.snake.open('please provide all the details','close',{
    //     duration:3000,
    //     horizontalPosition:'center',
    //     verticalPosition:'top'
    //   })
    // }
  }
  hasError(control:any,error:string):boolean {
    return control?.errors?.[error];
  }

}
