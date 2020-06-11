import { Component, OnInit, Input } from '@angular/core';
import {StorageService} from '../../services/storage.service'
import {HttpService} from '../../services/http.service'
import { Router } from '@angular/router';
import { ToolService } from 'src/app/tools/services/tool.service';



@Component({
  selector: 'app-add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.scss']
})
export class AddToolComponent implements OnInit {

  constructor(
    private storageService:StorageService,
    private httpService:HttpService,
    private router:Router,
    private toolService:ToolService,
    ) { }
  @Input() RequestType;
  @Input() ToolTags;
  user;data;newTag;
  type;
  tags:Array<string> = [];
  toolFiles: File[] = [];
  title;body;location

  ngOnInit(): void {
    this.user=this.storageService.getItem('user')

  }

 
   displayForm() {
    let add_form = document.getElementById("add_form");
    let add_button = document.getElementById("add_button");

    if (add_form.style.display === "none") {
      add_button.style.display = "none";
      add_form.style.display = "block";
    }
    else
    {
      this.title=this.body=this.newTag=this.type=this.location=null
      this.toolFiles=this.tags=[]

      add_button.style.display = "flex";
      add_form.style.display = "none";
    }
  }


  displayTagInput() {
    let add_input = document.getElementById("TagInput");

    if (add_input.style.display === "none") {
      add_input.style.display = "block";
    }
    else
    {
      this.newTag=null
      add_input.style.display = "none";
    }
  }


  addNewTag(){
    let found;
    if(this.newTag){
      found =  this.ToolTags.find(x=>x.name == this.newTag);
      if(!found)
        { this.ToolTags.push({name:this.newTag});}
      this.tags = this.tags || [];
      this.tags.push(this.newTag);
      }
      this.displayTagInput()
  }


  addPost(){
    const formData = new FormData();
    formData.append('type', this.type);
    formData.append('title', this.title);
    formData.append('body', this.body);
    if(this.toolFiles!=null){
      for (const file of this.toolFiles) {
        formData.append('files[]', file[0]);}
     }
     this.location?this.tags.push(this.location):"";
    if(this.tags!=null){
      for (const tag of this.tags) {
        formData.append('tags[]', tag);}
     }
    this.httpService.requestAddPost('tools',formData).subscribe(
      result=>{
        this.toolService.addTool(result,this.user,this.type,this.title,this.body,this.tags)
        this.displayForm();
      },
      error=>{
        console.log(error)
      }
    );
  }

  

  onChangeFile(event) {
    this.toolFiles.push(event.target.files);
  }

  removeFile(event)
  {
  let removeIndex= this.toolFiles.indexOf(event)
  this.toolFiles.splice(removeIndex, 1);  
  }


}
