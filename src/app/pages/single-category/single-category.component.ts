import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, mergeMap, tap } from 'rxjs';

import { CategoryService } from 'src/app/services/category.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-single-category',
    templateUrl: './single-category.component.html',
    styleUrls: [ './single-category.component.css' ]
})
export class SingleCategoryComponent implements OnInit, OnDestroy {
    posts: Array<object>

    currentCategory: DocumentData | DocumentData & { id: string };

    postsSubscription: Subscription = new Subscription();

    constructor(
        private categoryService: CategoryService,
        private postService: PostService,
        private activatedRoute: ActivatedRoute,
        public loader:LoaderService
    ) { }

    ngOnInit(): void {
        this.loader.notifyForLoading(true);

        this.postsSubscription = combineLatest([
            this.activatedRoute.params.pipe(
                mergeMap(params => {
                    const id = params[ 'id' ];
                    return this.categoryService.getOne$(id).pipe(
                        tap((category) => this.currentCategory = category),
                        mergeMap(() => this.postService.getPostsByCategory(id))
                    )
                }),
            )
        ]).subscribe({
            next: ([ postsData ]) => {
                this.posts = postsData;
                this.loader.notifyForLoading(false);
            },
            error: err => console.error(err)
        });
    }

    ngOnDestroy(): void {
        this.postsSubscription.unsubscribe();
    }
}
