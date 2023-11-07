import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Category } from 'src/app/interfaces';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-category-navbar',
    templateUrl: './category-navbar.component.html',
    styleUrls: [ './category-navbar.component.css' ]
})
export class CategoryNavbarComponent implements OnInit {
    categories: DocumentData & { id: string }[] | DocumentData[] | Category[];

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.categoryService.getAll$().subscribe({
            next: data => {
                this.categories = data
            },
            error: err => {
                console.error(err);
            }
        })
    }
}
