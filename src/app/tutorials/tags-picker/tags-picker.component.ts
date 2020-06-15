import { Component, OnInit } from '@angular/core';
import { Tag } from '../models/tag';
import { TutorialService } from '../models/services/tutorial.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tags-picker',
  templateUrl: './tags-picker.component.html',
  styleUrls: ['./tags-picker.component.scss'],
})
export class TagsPickerComponent implements OnInit {
  public tags: Tag[]=[];
  public filtredTags = [];
  constructor(
    private tutorialService: TutorialService,
    private router: Router,
    private activeRoute: ActivatedRoute,

  ) {
   
  }

  ngOnInit(): void {
    this.tutorialService.getTags().subscribe((res) => {
      this.tags = res.data.tags;
    });

    // this.activeRoute.queryParams.subscribe((map) => {
    //   console.log("here");
    //   let queryparam = map['tags'];
    //   if(this.tags.length)
    //   this.tags.map(tag => {
    //     if (tag.name   == queryparam) tag.active = true;
    //     else tag.active = false;
    //   })
    //   console.log(this.tags);
    // });
  }
  onClick(tag) {
    const idx = this.filtredTags.indexOf(tag);
    if (idx != -1) {
      this.filtredTags.splice(idx, 1);
      this.tags.map((arrTag) => {
        if (arrTag.name == tag) arrTag.active = false;
      });
    } else {
      this.filtredTags.push(tag);
      this.tags.map((arrTag) => {
        if (arrTag.name == tag) arrTag.active = true;
      });
    }
    const tagsString = this.filtredTags.join();
    this.router.navigate(['tutorials'], { queryParams: { tags: tagsString } });
  }
}
