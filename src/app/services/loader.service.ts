import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private apiCount = 0;
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoading$$.asObservable();

    constructor() { }

    showLoader() {
        if (this.apiCount === 0) {
            this.isLoading$$.next(true);
        }
        this.apiCount++;
    }

    hideLoader() {
        this.apiCount--;
        if (this.apiCount === 0) {
            this.isLoading$$.next(false);
        }
    }

    notifyForLoading(isLoading: boolean) {
        if (isLoading) {
            if (this.apiCount === 0) this.isLoading$$.next(isLoading);
            this.apiCount++;
        }
        else {
            this.apiCount--;
            if (this.apiCount === 0) this.isLoading$$.next(isLoading);
        }
    }
}
