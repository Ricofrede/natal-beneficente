import {
    collection,
    doc,
    getDoc,
    getDocs,
    where,
    orderBy,
    query
} from 'firebase/firestore/lite';
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from './init';
export interface PageContent {
    type: string
    value: any
}

export interface Page {
    name: string
    shortName: string
    intro?: string
    importance?: number
    status: 'private' | 'public'
    image?: ContentReference
    content: PageContent[]
}

export interface Image {
    title: string
    caption: string
    image: string
}

export interface ContentReference {
    id: string
}

export async function getPages(): Promise<Page[]> {
    const col = collection(db, 'pages')
    const q = await query(col, where("status", "==", "public"), orderBy('importance'))
    const docs = await getDocs(q)
    const list = docs.docs.map(doc => doc.data() as Page)

    return list;
}

export async function getPage(id: string): Promise<Page> {
    const docRef = doc(db, 'pages', id)
    const docSnap = await getDoc(docRef)
    const info = docSnap.data() as Page

    return info
}

export async function getImage(imageObj: ContentReference): Promise<Image> {
    if (!imageObj?.id) return { title: '', caption: '', image: '' }

    const docRef = doc(db, 'images', imageObj.id)
    const docSnap = await getDoc(docRef)
    const info = docSnap.data()

    const imageUrl = await grabFileURLFromStorage(info?.image || null)

    return {
        title: info?.title || '',
        caption: info?.caption || '',
        image: imageUrl
    }
}

async function grabFileURLFromStorage(path: string | null): Promise<string> {
    if (!path) return ''

    const pathReference = ref(storage, path);
    const url = await getDownloadURL(pathReference)

    return url
}