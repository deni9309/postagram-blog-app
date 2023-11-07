import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Category } from 'src/app/interfaces';

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: [ './post-card.component.css' ]
})
export class PostCardComponent {
    @Input({ alias: 'category-data' }) category: DocumentData | DocumentData & { id: string } | Category;
}
