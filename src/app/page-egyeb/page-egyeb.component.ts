import { Component, OnInit } from '@angular/core';
import {Http,Response} from "@angular/http";
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-page-egyeb',
  templateUrl: './page-egyeb.component.html',
  styleUrls: ['./page-egyeb.component.css'],
})
export class PageEgyebComponent implements OnInit {
  private usersUrl = "https://api.spacexdata.com/v2/launches/latest?pretty";
  private http;
  public rocketName;
  public date;
  public details;
  public imgSource;
  public article;

  constructor(http:Http){
    this.http=http;

  }

  getData() {
    return this.http.get(this.usersUrl)
      .map(this.extractData)
  }

  private extractData(res: Response) {
    return res.json();
    //let body = res.json();
    //return body.data || { };
  }

  ngOnInit() {
    this.getData().subscribe(data=>{
      this.rocketName=data.rocket.rocket_name;
      this.date = data.launch_date_local;
      this.details=data.details;
      this.imgSource=data.links.mission_patch;
      this.article=data.links.article_link;
    });
  }

}
