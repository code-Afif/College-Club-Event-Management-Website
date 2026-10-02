import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { EventsPage } from './pages/EventsPage.jsx';
import { AdminLogin } from './pages/AdminLogin.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

const queryClient = new QueryClient();

export default function App() {
  // UTM Tracking logic
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    let saved = false;
    
    utmParams.forEach(param => {
      if (params.has(param)) {
        sessionStorage.setItem(param, params.get(param));
        saved = true;
      }
    });
    
    // Optionally log if we grabbed UTMs
    if (saved) console.log('UTM parameters stored in session.');
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
