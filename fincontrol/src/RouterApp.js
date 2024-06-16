import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import GoalsPage from "./pages/GoalsPage";
import AccountPage from "./pages/AccountPage";
import ProtectedRoute from "./ProtectedRoute"; // Импорт компонента
import PublicRoute from "./PublicRoute"; // Импорт компонента

const RouterApp = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } />
        <Route path='/login' element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
         <Route path='/account' element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        } />
         <Route path='/goals' element={
          <ProtectedRoute>
            <GoalsPage />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate replace to="/register" />} />
      </Routes>
    </div>
  );
};

export default RouterApp;
