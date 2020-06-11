import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private toolsArray = new BehaviorSubject<any>(null);
  private Type1Array = new BehaviorSubject<any>(null);
  private Type2Array = new BehaviorSubject<any>(null);
  private SearchArray = new BehaviorSubject<any>(null);


  currentTools = this.toolsArray.asObservable();
  Type1Tools = this.Type1Array.asObservable();
  Type2Tools = this.Type2Array.asObservable();
  SearchTools = this.SearchArray.asObservable();
  tool;comment;

  constructor() { }

  ToolList(tools:any) {
    this.toolsArray.next(tools)

  };
  Type1List(tools:any) {
    this.Type1Array.next(tools)
  };
  Type2List(tools:any) {
    this.Type2Array.next(tools)
  };
  SearchList(tools:any) {
    this.SearchArray.next(tools)
  };

  

  addTool(result,user,type,title,body,tags){
   let typeName=this.getType(type)
    this.tool={
      "id": result.data.tool.id,
      "title":title,
      "body":body,
      "type": typeName,
      "closed":false,
      "user":{id:user.id,name:user.name,avatar:user.avatar},
      "comments":[],
      "files":this.addFiles(result.data.tool.files),
      "tags":this.addTags(tags),
      "created_at": "",
      "created_at_human": "now"
    }
    
    this.toolsArray.value.unshift( this.tool);

    if(type=="0"||type=="2")
       this.Type1Array.value.unshift(this.tool)
  
    else if(type=="1"||type=="3")
       this.Type2Array.value.unshift(this.tool)
    

  }

  addFiles(files)
  {
      let filesArray: File[]=[];
      files.forEach((file) => {
        filesArray.push(file);
      });
      return filesArray;
  }
  
  addTags(tags)
  {
    let tagsArray: Array<any> =[];
      tags.forEach((tag) => {
        tagsArray.push(tag);
    });
      return tagsArray; 
  } 
  
  deleteTool(tool){
    let removeIndex
    removeIndex=this.toolsArray.value.indexOf(tool);
    this.toolsArray.value.splice(removeIndex, 1); 

    if(tool.type=="Need"||tool.type=="Living")
      { removeIndex=this.Type1Array.value.indexOf(tool);
       this.Type1Array.value.splice(removeIndex, 1); 
      }
  
    else if(tool.type=="Offer"||tool.type=="Car")
      {removeIndex=this.Type2Array.value.indexOf(tool);
       this.Type2Array.value.splice(removeIndex, 1);}
    
    if(this.SearchArray.value!=null)
    { let tempTool=this.SearchArray.value.find(x=>x.id==tool.id);
      removeIndex=this.SearchArray.value.indexOf(tempTool);
       this.SearchArray.value.splice(removeIndex, 1);
    }
    
    }

  addToolComment(tool,comment,commentBody,user)
  {    
    tool.comments.push(this.comment={
      id:comment.data.comment.id,
      body:commentBody,
      user:user,
      created_at_human: "now",
    })
  }

  deleteToolComment(tool,comment)
  { let removeIndex;
    removeIndex=tool.comments.indexOf(comment)
    tool.comments.splice(removeIndex, 1); 
  }
  
  getType(type)
  {
    switch(type) {
      case "0":
          return "Need"
      case "1":
          return "Offer"
      case "2":
          return "Living"
      case "3":
          return "Car"
     
    }
  }
}

