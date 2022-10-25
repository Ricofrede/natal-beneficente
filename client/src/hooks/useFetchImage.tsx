import { useState, useEffect } from 'react'

import { Image, getImage, ContentReference } from '../firebase/functions'

export default function useFetchImage(value: ContentReference) {
    const [data, setData] = useState<Image | null>(null)
    const [loading, setLoading] = useState<Boolean>(true)
    const [error, setError] = useState<String | null>(null)

    useEffect(() => {
        async function fetcher() {
            try {
                const newData = await getImage(value)
                setData(newData)
                setLoading(false)
                setError(null)
            } catch (e) {
                setError(String(e))
                setLoading(false)
                setData(null)
            }
        }
        fetcher()
    }, [value])

    return { data, loading, error }
}