import { useState, useCallback } from 'react'

// хук, который будет позволять работать с запросами на сервер
export const useHttp = () => {
    // функция загрузки
    const [loading, setLoading] = useState(false)
    // потенциальной ошибки
    const [error, setError] = useState(null)

    // функция принимает url, method = 'GET', body = null, headers
    // чтобы реакт не входил в рекурсию оборачиваем в useCallback
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        // лоадинг пошел 
        setLoading(true)
        try {
            // если боди передаем, то его нужно привести в строке
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            // когда сделалмя запрос на сервер получаем объект response и его нужно привести к формату json
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            // если запрос не ок
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            // функция прошла, запрос отработал поэтому setLoading(false)
            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    // функция, которая чистит ошибки
    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}
