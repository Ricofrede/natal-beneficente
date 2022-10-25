import { useState, useEffect } from 'react'

import { Page, getPages } from '../firebase/functions'

export default function useFetchPages() {
    const [data, setData] = useState<Page[]>([])
    const [loading, setLoading] = useState<Boolean>(true)
    const [error, setError] = useState<String | null>(null)

    useEffect(() => {
        async function fetcher() {
            try {
                const newData = await getPages()
                setData(newData)
                setLoading(false)
                setError(null)
            } catch (e) {
                setError(String(e))
                setLoading(false)
                setData([])
            }
        }
        fetcher()
    }, [])

    return { data, loading, error }
}