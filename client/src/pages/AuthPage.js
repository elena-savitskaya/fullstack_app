import React, { useEffect, useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()

    // доастаю поля из хука
    const { loading, request, error, clearError } = useHttp()

    // создаю состояние для форм
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        console.log('Error', error)
        message(error)
        clearError()
    }, [error, message, clearError])

    // updateTextFields - метод, который позволяет сделать активными инпуты после того как сделан выход из системы
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    // метод для обновления формы
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    // методы для регистрации и для логина
    const registerHandler = async () => {
        try {
            // этот путь уже осуществлен на бекэнде, 2й параметр - это метод пост, и данный емейл и пароль (... форм)
            // "proxy": "http://localhost:5000", в package,json добавляю это поле
            const data = await request('/api/auth/register', 'POST', { ...form })
            // выводим пользователю сообщение, что все прошло успешно
            message(data.message)
        } catch (e) { }
        // керч пустой, потому что мы его уже оработали в хуке
    }

    const loginHandler = async () => {
        try {
            // этот путь уже осуществлен на бекэнде
            const data = await request('/api/auth/login', 'POST', { ...form })
            // если пользователь существует и ввел данные верно, то в консоле увидим токен и айди - тот, который уже есть на монгоДБ.
            console.log('Data', data)
            // используя юзконтекст из AuthContext можно вызвать метод логин
            auth.login(data.token, data.userId)
        } catch (e) { }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card cyan darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            {/* 2 текстовых инпута копирую из библиотеки */}
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{ marginRight: 10 }}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Sign in
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            // пока лоадинг тру, дизейбл тоже тру
                            disabled={loading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;