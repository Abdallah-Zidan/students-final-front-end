import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../../user/models/user.model';

const endPoints = {
	posts: 'http://localhost:8000/api/v1/dashboard/posts'
};

@Injectable({
	providedIn: 'root'
})
export class PostService {
	constructor(private http: HttpClient) { }

	getPosts(items, page: number = 1): Observable<Post[]> {
		let subject = new Subject<any>();
		let params = new HttpParams().append('items', items.toString()).append('page', page.toString());

		this.http.get(endPoints.posts, {
			params: params
		}).subscribe((res: any) => {
			if (res) {
				console.log(res);
				let length = res.meta.total;
				let pageSize = res.meta.per_page;
				let posts = new Array<Post>();

				res.data.posts.map(post => {
					let scope;

					if (post.department_faculty) scope = 'Department';
					else if (post.faculty) scope = 'Faculty';
					else if (post.university) scope = 'University';

					posts.push(new Post(post.id, post.body, post.reported, post.year, new User(post.user.id, post.user.name), scope, post.created_at_human));
				});

				subject.next({
					length: length,
					pageSize: pageSize,
					posts: posts
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	deletePost(id: number) {
		let subject = new Subject();

		this.http.delete(`${endPoints.posts}/${id}`).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}
}