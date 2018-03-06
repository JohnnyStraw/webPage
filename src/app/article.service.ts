import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { Http, Response } from '@angular/http';

import {WriteArticleComponent} from "./write-article/write-article.component";
import {Headers,RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable()
export class ArticleService {

  public static mainArticles:WriteArticleComponent[];
  public static egyebArticles:WriteArticleComponent[];
  public  http;

  constructor(http:Http) {
    ArticleService.mainArticles=[];
    ArticleService.egyebArticles=[];
    this.http=http;


  }
  newMainArticle(article){
    console.log("article is: ",article);
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/upload/articleMain', article, {
      headers: headers
    })
      .subscribe(data => {
        console.log(data);
      });
  }
  newEgyebArticle(article){
    console.log("article is: ",article);
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/upload/articleEgyeb', article, {
      headers: headers
    })
      .subscribe(data => {
        console.log(data);
      });
  }
  static getMainArticles(): Observable<WriteArticleComponent[]> {
    return of(ArticleService.mainArticles);
  }
  static getEgyebArticles(): Observable<WriteArticleComponent[]> {
    return of(ArticleService.egyebArticles);
  }
  }

