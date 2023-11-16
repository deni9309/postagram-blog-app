import { Injectable } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, query, where, limit, orderBy, doc, docData, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private firestore: Firestore) { }

    getAllFeatured$(): Observable<DocumentData & { id: string }[] | DocumentData[]> {
        const docsRef = collection(this.firestore, 'posts');

        const q = query(docsRef, where('isFeatured', '==', true), limit(4));

        return collectionData(q, { idField: 'id' });
    }

    getLatest$(): Observable<DocumentData & { id: string }[] | DocumentData[]> {
        const docsRef = collection(this.firestore, 'posts');

        const q = query(docsRef, orderBy('updatedAt', 'desc'));

        return collectionData(q, { idField: 'id' });
    }

    getPostsByCategory$(categoryId: string): Observable<DocumentData[] | DocumentData & { id: string }[]> {
        const postsRef = collection(this.firestore, 'posts');

        const queryByCategory = query(
            postsRef,
            where('category.categoryId', '==', categoryId),
            orderBy('updatedAt', 'desc')
        );
        return collectionData(queryByCategory, { idField: 'id' });
    }

    getOneById$(postId: string): Observable<DocumentData | DocumentData & { id: string }> {
        const docRef = doc(this.firestore, 'posts', postId);

        return docData(docRef, { idField: 'id' });
    }
}
