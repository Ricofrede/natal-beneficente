import { collection, doc, getDoc, getDocs, where, query } from 'firebase/firestore/lite';
import { db } from './init';

export interface Content {
    type: string
    value: string
}

export interface Page {
    name: string
    intro?: string
    status: 'private' | 'public'
    image?: string
    content: Content[]
}

export async function getPages(): Promise<Page[]> {
    const col = collection(db, 'pages')
    const q = await query(col, where("status", "==", "public"))
    const docs = await getDocs(q)
    const list = docs.docs.map(doc => doc.data() as Page)
    return list;
}

export async function getPage(id: string): Promise<Page> {
    const docRef = doc(db, 'pages', id)
    const docSnap = await getDoc(docRef)
    const info = docSnap.data() as Page
    return info;
}