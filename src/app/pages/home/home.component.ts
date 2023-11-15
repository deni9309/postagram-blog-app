import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit, OnDestroy {
    posts: Array<object> = undefined;
    latestPosts: Array<object>;

    subscriptionFeatured: Subscription = new Subscription();
    subscriptionLatest: Subscription = new Subscription();

    constructor(private postService: PostService, public loader: LoaderService) { }

    ngOnInit(): void {
        this.loader.notifyForLoading(true);

        this.subscriptionFeatured = this.postService.getAllFeatured().subscribe({
            next: data => {
                this.posts = data;
                this.loader.notifyForLoading(false);
            },
            error: err => console.error(err)
        });

        this.subscriptionLatest = this.postService.getLatest().subscribe({
            next: docs => {
                this.latestPosts = docs;
            },
            error: err => console.error(err)
        });
    }

    ngOnDestroy(): void {
        this.subscriptionFeatured.unsubscribe();
        this.subscriptionLatest.unsubscribe();
    }
}
