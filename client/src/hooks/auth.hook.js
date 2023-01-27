// хук, который отвечает за авторизацию
import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  // метод логин - будем получать с бекенда jwtToken и айди
  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)

    // и дальше это все нужно записать в локалсторедж
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken
    }))
  }, [])

  //  метод, который будет позволять выходить из системы
  const logout = useCallback(() => {
    // токен и айди привести к нал и очистить локалсторедж
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])


  // при загрузке приложения по умолчанию хук должен смотреть есть ли данные и сам их заисывать в локальное состояние
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    // если дата не нул и есть поле токен, то вызываем функцию логин с 2мя параментами токен и айди 
    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
    // как зависимость здесь метод логин
  }, [login])


  return { login, logout, token, userId, ready }
}
