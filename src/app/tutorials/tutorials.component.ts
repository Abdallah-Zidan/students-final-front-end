import { Component, OnInit } from '@angular/core';
import { Tutorial } from './models/tutorial';
import { User } from '../auth/user.model';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { TutorialService } from './models/services/tutorial.service';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {

  tutorials: Array<Tutorial>;
  resource = 'tutorials';
  tags;
  currentUser: User
  constructor(
    private tutorialService: TutorialService,
    private activeRoute: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.tutorialService.tutorialSubject.subscribe((tutorials) => {
      this.tutorials = tutorials;
    });
    this.currentUser = this.storageService.getUser('user');
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((map) => {
      this.tags = map['tags'];
      this.tutorialService.getTutorials(this.tags);
    });
  }
}
