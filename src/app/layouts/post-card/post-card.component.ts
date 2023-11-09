import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Post } from 'src/app/interfaces';

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: [ './post-card.component.css' ]
})
export class PostCardComponent implements OnChanges, OnInit {
    @Input({ alias: 'postItem' }) postItem: DocumentData & { id: string } | DocumentData;

    dataObj: Post;

    constructor() { }

    ngOnInit(): void {
        this.dataObj = this.postItem as Post
    }

    ngOnChanges(changes: SimpleChanges) { }
}
