import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent,
        data: {
            title: 'Home'
        }
    },
    {
        path: 'category/:category/:id',
        component: SingleCategoryComponent,
        data: {
            title: 'Categories'
        }
    },
    {
        path: 'post/:id',
        component: SinglePostComponent,
        data: {
            title: 'Post Detail'
        }
    },
    {
        path: 'about',
        component: AboutUsComponent,
        data: {
            title: 'About Us'
        }
    },
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent,
        data: {
            title: 'Terms & Privacy'
        }
    },
    {
        path: 'contacts',
        component: ContactUsComponent
    },
    {
        path: 'page-not-found',
        component: PageNotFoundComponent
    },
    {
        path: '**',
        redirectTo: 'page-not-found'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
