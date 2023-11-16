import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest, mergeMap, tap, withLatestFrom } from 'rxjs';
import { Category, Post } from 'src/app/interfaces';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-single-post',
    templateUrl: './single-post.component.html',
    styleUrls: [ './single-post.component.css' ]
})
export class SinglePostComponent implements OnInit, OnDestroy {
    post: DocumentData | DocumentData & { id: string };
    currentCategory: Category;
    latestPosts: Array<object>;

    subscription: Subscription = new Subscription();

    constructor(
        private activatedRoute: ActivatedRoute,
        private postService: PostService,
        public loader: LoaderService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loader.notifyForLoading(true);

        this.subscription = combineLatest([
            this.activatedRoute.params.pipe(
                mergeMap(params => {
                    const postId = params[ 'id' ];
                    return this.postService.getOneById$(postId).pipe(
                        tap(p => this.currentCategory = p[ 'category' ])
                    );
                })),
                this.postService.getLatest$()
        ]).subscribe({
            next: ([ postData, latestData ]) => {
                this.post = postData;
                this.latestPosts = latestData;
               
                this.loader.notifyForLoading(false);
            },
            error: err => {
                this.loader.notifyForLoading(false);

                console.error(err);
                this.router.navigate([ '/page-not-found' ]);
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
