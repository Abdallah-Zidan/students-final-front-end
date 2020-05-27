import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main-post',
  templateUrl: './main-post.component.html',
  styleUrls: ['./main-post.component.scss']
})
export class MainPostComponent implements OnInit {

  posts: Array<{ image: string, name: string, text: string }> = [
    {
      image: '../../../assets/images/avatar-exemple.jpg',
      name: 'Ali Gomaa',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorem iusto dolor assumenda, adipisci suscipit.Officiis provident at perferendis perspiciatis quidem quaerat natus doloremque quisquam rem, autem sunt rerum voluptatem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorem iusto dolor assumenda, adipisci suscipit.Officiis provident at perferendis perspiciatis quidem quaerat natus doloremque quisquam rem, autem sunt rerum voluptatem.',
    },
    {
      image: '../../../assets/images/avatar-exemple.jpg',
      name: 'Ali Gomaa',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorem iusto dolor assumenda, adipisci suscipit.Officiis provident at perferendis perspiciatis quidem quaerat natus doloremque quisquam rem, autem sunt rerum voluptatem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorem iusto dolor assumenda, adipisci suscipit.Officiis provident at perferendis perspiciatis quidem quaerat natus doloremque quisquam rem, autem sunt rerum voluptatem.',
    },
    {
      image: '../../../assets/images/avatar-exemple.jpg',
      name: 'Ali Gomaa',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorem iusto dolor assumenda, adipisci suscipit.Officiis provident at perferendis perspiciatis quidem quaerat natus doloremque quisquam rem, autem sunt rerum voluptatem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorem iusto dolor assumenda, adipisci suscipit.Officiis provident at perferendis perspiciatis quidem quaerat natus doloremque quisquam rem, autem sunt rerum voluptatem.',
    },
  ];

  isEmpty = true;

  onCommenting($event){
    if($event.target.value){
      this.isEmpty = false;
    }
    else{
      this.isEmpty = true;
    }
  }


  constructor() { }
  ngOnInit(): void {
  }

}
