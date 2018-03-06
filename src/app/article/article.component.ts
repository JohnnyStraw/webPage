import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public author;
  public date;
  public title;
  public article;
  constructor(author,date,title,article) {
    this.author=author;
    this.date=date;
    this.title=title;
    this.article=article;
  }

  ngOnInit() {
  }

}

