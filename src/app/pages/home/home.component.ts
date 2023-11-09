import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit, OnDestroy {
    posts: Array<object>;
    subscription: Subscription = new Subscription();

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.subscription = this.postService.getAllFeatured().subscribe({
            next: data => {
                this.posts = data;
            },
            error: err => {
                console.error(err);
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
