import { Component, OnInit } from '@angular/core';
import * as json from './egyebArticles.json'

@Component({
  selector: 'app-page-rolam',
  templateUrl: './page-rolam.component.html',
  styleUrls: ['./page-rolam.component.css'],
})
export class PageRolamComponent {

  public articleData= {
    author:[],date:[],title:[],article:[]
  };
  public articleBoolean=false;
  constructor(){

    for(let i=0;i<json[0].articles.length;i++){
      this.articleData.author.push(json[0].articles[i].author);
      this.articleData.date.push(json[0].articles[i].date);
      this.articleData.title.push(json[0].articles[i].title);
      this.articleData.article.push(json[0].articles[i].article);
      this.articleBoolean=true;

    }
    console.log(this.articleData);
  }

}
