import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from './pages/AuthPage'
import DetailPage from './pages/DetailPage'
import ProfilePage from './pages/ProfilePage';


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route exact path="/profile" element={<ProfilePage />} />
                <Route exact path="/detail/:id" element={<DetailPage />} />
                <Route path="" element={<Navigate to="/profile" />} />
            </Routes >
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="" element={<Navigate to="/profile" />} />
        </Routes>
    )
}
