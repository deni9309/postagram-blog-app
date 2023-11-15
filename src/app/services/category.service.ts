import { Injectable } from '@angular/core';
import { Firestore, DocumentData, collection, DocumentReference, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable, tap } from 'rxjs';
import { Category } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private firestore: Firestore) { }

    getAll$(): Observable<Category[] | DocumentData[] | DocumentData & { id: string }[]> {
        const collectionRef = collection(this.firestore, 'categories');

        return collectionData(collectionRef, { idField: 'id' });
    }

    getOne$(categoryId: string): Observable<DocumentData & { id: string } | DocumentData> {
        const docRef = doc(this.firestore, 'categories', categoryId);

        return docData(docRef, { idField: 'id' });
    }
}
