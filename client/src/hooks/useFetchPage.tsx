import { useState, useEffect } from 'react'

import { Page, getPage } from '../firebase/functions'

export default function useFetchPage(id: string) {
    const [data, setData] = useState<Page | null>(null)
    const [loading, setLoading] = useState<Boolean>(true)
    const [error, setError] = useState<String | null>(null)

    useEffect(() => {
        async function fetcher() {
            try {
                const newData = await getPage(id)
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
    }, [id])

    return { data, loading, error }
}