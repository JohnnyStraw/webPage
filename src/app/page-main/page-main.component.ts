import { Component, OnInit } from '@angular/core';
import {ArticleService} from'../article.service'
import {WriteArticleComponent} from "../write-article/write-article.component";
import * as json from './mainArticles.json'



@Component({
  selector: 'page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css'],
})
export class PageMainComponent  {

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
