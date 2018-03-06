import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../article.service'


@Component({
  selector: 'app-write-article',
  templateUrl: './write-article.component.html',
  styleUrls: ['./write-article.component.css']
})
export class WriteArticleComponent implements OnInit {

  public checkboxHome:boolean;
  public checkboxRolam:boolean;

  public author;
  public date;
  public title;
  public article;

  public as;

  constructor(as:ArticleService) {
    this.as=as;

  }
  ngOnInit() {

    this.checkboxHome = false;
    this.checkboxRolam = false;
  }
  upload(){

    if(this.checkboxHome==true){
        this.as.newMainArticle(this);


    }
    if(this.checkboxRolam==true){
      this.as.newEgyebArticle(this);

    }
  }
  getData(){
    return { title: this.title,
             date: this.date,
            author: this.author,
            article: this.article};
  }

}
