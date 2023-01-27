const { Router } = require('express')

// подключаю библиотекуbcryptjs
// подключаю jwt
// подключаю 2 метода из валидатора

const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
    '/register',
    // здесь происходит валидация
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            // здесь происходит проверка валидации
            const errors = validationResult(req)

            // если ошибки есть
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    // на фронтэенд передаю
                    errors: errors.array(),
                    message: 'Некорректныe данные при регистрации'
                })
            }

            const { email, password } = req.body
            // проверяю есть ли такой emqil  в базе
            const candidate = await User.findOne({ email })
            // если он его нашел - такой пользователь существует. return - чтобы скрипт не шел дальше
            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }
            // передаю сюда пароль, который получен
            const hashedPassword = await bcrypt.hash(password, 12)
            // в нового пользователся передаем пароль
            const user = new User({ email, password: hashedPassword })

            await user.save()
            // юзер создан
            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при входе в систему'
                })
            }

            const { email, password } = req.body
            // findOne - ищу одного пользователя по емейлу
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }
            // когда пользователя мы нашли нужно проверить совпалают ли пароли
            const isMatch = await bcrypt.compare(password, user.password)
            // если пароль не совпадает
            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }
            // авторизацию делаю через jwt токен
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })


module.exports = router

