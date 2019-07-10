import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";



  //TODO: insert DB API endpoint here
  url: string = "http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Login/";
  //url: string = "http://localhost:8080/poketie/Login/"

  constructor(private route: Router, @Inject(SESSION_STORAGE) private session: WebStorageService) { }
  
  ngOnInit() {
  }

  login(event){

    let creds = [this.username,this.password]
    var router = this.route
    var sesh = this.session

    if(this.username !== "" && this.password !== ""){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.url);
    xhr.onreadystatechange = function (){
      if(this.readyState === 4 && this.status===200){
        let autho = xhr.getResponseHeader("Authentication");
        console.log("HERE IS THE AUTHO: " + autho)
        sesh.set("token", autho);
        //sessionStorage.setItem("token", autho);
        //redirect here
        console.log("THIS SHOULD BE THE AUTHO FROM SESSIONSTORAGE: "+sesh.get("token"))
        router.navigate(['/backpack'])
      } else if(this.readyState === 4 && this.status === 403){
        alert("Invalid username or password")
      }
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', router.url)
    xhr.send(JSON.stringify(creds));
  } else {
    console.log("User tried inputting blank fields...");
    alert("Please input into the username and password fields");
  }
  }





}
