import { Component, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-goto-top',
  templateUrl: './goto-top.component.html',
  styleUrls: ['./goto-top.component.css']
})
export class GotoTopComponent implements OnDestroy {
    isVisible = false;
    topPosToStartShowing = 100;

    eventSubscription = fromEvent(window, 'scroll').subscribe(e => {
        this.checkScroll();
    });

    checkScroll() {
        const scrollPosition = window.scrollY || 0;

        if (scrollPosition >= this.topPosToStartShowing) {
            this.isVisible = true;
        }
        else {
            this.isVisible = false;
        }
    }

    gotoTop() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    ngOnDestroy(): void {
        this.eventSubscription.unsubscribe();
    }
}
