import { Component, OnInit , Input,Inject} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToolService } from 'src/app/tools/services/tool.service';
import {HttpService} from '../../services/http.service'


@Component({
  selector: 'app-tool-post',
  templateUrl: './tool-post.component.html',
  styleUrls: ['./tool-post.component.scss']
})
export class ToolPostComponent implements OnInit {
isEmpty=false;
editing=false;
CommentBody;
@Input() tool;
@Input() user;
@Input() ToolTags;
  constructor(
    public dialog: MatDialog,
    public deleteDialog:MatDialog,
    private toolService:ToolService,
    private httpService:HttpService,

    ) { }

  ngOnInit(): void {}

  editTool(tool){
    const OldTool=Object.assign({}, tool);
    
    const dialogRef = this.dialog.open(EditToolDialog, {
      width: '500px',
      data: {tool:tool,ToolTags:this.ToolTags}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(typeof result === 'undefined')
        {this.tool=Object.assign({}, OldTool)}
      else
        { this.httpService.requestUpdatePost("tools",this.tool,this.tool.id).subscribe(
          result=>{console.log(result)},
          error=>{console.log(error)});
        }
      },
       error=>{console.log(error)}
      );
   }

   addComment()
   {
    this.httpService.requestAddComment("tools",this.CommentBody, this.tool.id).subscribe(
      result=>{
        this.toolService.addToolComment(this.tool,result,this.CommentBody,this.user)
        this.CommentBody="";
      },
      error=>{console.log(error)});
    }


  deleteTool(tool){
    const dialogRef = this.deleteDialog.open(DeleteTool);
    dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
      this.httpService.requestDeletePost("tools",tool.id).subscribe(
        result=>{console.log(result)},
        error=>{console.log(error)}
        );
      this.toolService.deleteTool(tool)
      }}
    );
  }

  closeTool(tool){
    this.httpService.requestCloseTool(tool.id).subscribe(
      result=>{
        console.log(result);
        tool.closed=true;
      },
      error=>{console.log(error)}
      );
  }

}

@Component({
  selector: 'edit-tool-dialog',
  templateUrl: 'edit-tool-dialog.html',
  styleUrls: ['./tool-post.component.scss']
})
export class EditToolDialog  {

  constructor(
    public dialogRef: MatDialogRef<EditToolDialog>,
    @Inject(MAT_DIALOG_DATA) public data,public dialog: MatDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
selector: 'delete-tool',
templateUrl: 'delete-tool.html',
})
export class DeleteTool {}