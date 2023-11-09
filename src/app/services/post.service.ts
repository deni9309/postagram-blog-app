import { Injectable } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, query, docData, getDocs, where, getDocsFromServer, limitToLast, limit, } from '@angular/fire/firestore';
import { Observable, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private firestore: Firestore) { }

    getAllFeatured(): Observable<DocumentData & { id: string }[] | DocumentData[]> {
        const docsRef = collection(this.firestore, 'posts');

        const q = query(docsRef, where('isFeatured', '==', true), limit(4));

        return collectionData(q, { idField: 'id' }).pipe(tap(data => console.log(data)
        ));
    }
}
