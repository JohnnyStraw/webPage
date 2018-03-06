import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private username:string;
  private pass:string;
  private hardcodedUser="Jannini";
  private hardcodedPassword="jedike";
  constructor() {

  }

  ngOnInit() {

  }


  validate(username,pass){
    this.username=username;
    this.pass=pass;
    if(this.username==this.hardcodedUser && this.pass==this.hardcodedPassword){
      let loginPopUp = document.getElementById("myModal");
      let page = document.getElementById("div");
      page.style.display = 'block';
      loginPopUp.remove();
    }
    else{
      let para = document.createElement("P");
      let t = document.createTextNode("Wrong username or password");
      para.style.color="red";
      para.appendChild(t);
      document.getElementById("formDiv").appendChild(para);
    }
  }

}
