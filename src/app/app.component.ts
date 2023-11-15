import { Component } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'postagram-blog-app';
    
    constructor(private router: Router, private pageTitle: Title) {
        this.router.events.pipe(
            filter((e): e is ActivationStart => e instanceof ActivationStart),
            map(e => e.snapshot.data?.[ 'title' ]),
            filter((d) => !!d)
        ).subscribe((data) => {
            this.pageTitle.setTitle(data + ' | POSTAGRAM');
        });
    }
}
