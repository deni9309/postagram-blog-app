import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: [ './about-us.component.css' ]
})
export class AboutUsComponent {

    constructor(private router: Router) { }

    navigateToTermsPage(): void{
        this.router.navigate([ '/terms-and-conditions' ]);
    }

    navigateToHomePage(): void {
        this.router.navigate([ '/home' ]);
    }
}
