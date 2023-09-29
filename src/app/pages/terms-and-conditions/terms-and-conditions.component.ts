import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-terms-and-conditions',
    templateUrl: './terms-and-conditions.component.html',
    styleUrls: [ './terms-and-conditions.component.css' ]
})
export class TermsAndConditionsComponent {
    
    constructor(private router: Router) { }

    navigateToHomePage(): void {
        this.router.navigate([ '/home' ]);
    }
}
