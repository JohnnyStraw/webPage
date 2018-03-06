import {Component, OnDestroy, AfterContentInit, OnInit, ViewChild, ElementRef} from '@angular/core';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:3000/upload';




@Component({
  selector: 'app-page-projectek',
  templateUrl: './page-projectek.component.html',
  styleUrls: ['./page-projectek.component.css'],
})
export class PageProjectekComponent implements OnInit, OnDestroy{

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  public img:HTMLImageElement;

  ngOnDestroy(): void {
    //this.destroyCanvas();
    console.log('analog-destroy');
  }

  ngOnInit() {
    let div=document.getElementById("div");
    div.style.display="none";
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false;
    };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item.file.name, status, response);
      this.img=document.createElement("img");
      let string=("../../assets/img/"+item.file.name);
      this.img.src=string.replace("mp3","png");
      this.img.style.display="block";
      this.img.style.margin="0 auto";
      document.getElementById("imgdiv").appendChild(this.img);
    };
  }

  showUpload(){

    let div=document.getElementById("div");
    if(div.style.display=="none") {
      div.style.display = "block";
    }
    else{
      div.style.display="none";
    }
  }


}
