import {
    collection,
    doc,
    getDoc,
    getDocs,
    where,
    query,
    DocumentData
} from 'firebase/firestore/lite';
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from './init';
export interface PageContent {
    type: string
    value: any
}

export interface Page {
    name: string
    intro?: string
    status: 'private' | 'public'
    image?: Image
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
    const q = await query(col, where("status", "==", "public"))
    const docs = await getDocs(q)
    const list = docs.docs.map(doc => doc.data())
    const formattedList: Page[] = []
    for (const thisInfo of list) {
        const formattedInfo = await formatPage(thisInfo)
        formattedList.push(formattedInfo)
    }

    return formattedList;
}

export async function getPage(id: string): Promise<Page> {
    const docRef = doc(db, 'pages', id)
    const docSnap = await getDoc(docRef)
    const info = docSnap.data()
    const formattedInfo = await formatPage(info)

    return formattedInfo
}

async function formatPage(info: DocumentData | undefined) {
    const mainImage = await getImage(info?.image)

    const formattedInfo: Page = {
        name: info?.name || '',
        intro: info?.intro || '',
        status: info?.status || 'private',
        image: mainImage,
        content: info?.content || []
    }

    return formattedInfo;
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