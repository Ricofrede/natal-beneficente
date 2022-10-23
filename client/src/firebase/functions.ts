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
    value: string | Image
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

interface ContentReference {
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

    const content: PageContent[] = []
    for (const thisContent of info?.content) {

        let newContent = thisContent
        if (thisContent.type !== 'text') {
            newContent = await formatPageContent(thisContent)
        }

        content.push(newContent)
    }

    const formattedInfo: Page = {
        name: info?.name || '',
        intro: info?.intro || '',
        status: info?.status || 'private',
        image: mainImage,
        content: content
    }

    return formattedInfo;
}

async function formatPageContent(
    content: {
        type: string,
        value: ContentReference
    }
): Promise<PageContent> {
    if (!content?.type) return { type: '', value: '' }

    const contentDeepCopy = JSON.parse(JSON.stringify(content))
    let formattedContent: PageContent = contentDeepCopy

    if (content.type === 'image') {
        formattedContent.value = await getImage(content.value)
    }

    return formattedContent
}

async function getImage(imageObj: ContentReference): Promise<Image> {
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