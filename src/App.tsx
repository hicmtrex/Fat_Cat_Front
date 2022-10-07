import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import ChatPage from './pages/ChatPage';
import useAuthStore from './store/useAuth';
import { authorizationProvider } from './lib/fetch';
import Loader from './components/UI/Loader';
import AuthProvider from './utils/auth-routes';

const App = () => {
  const { token, refreshToken, refreshLoading } = useAuthStore(
    (state) => state
  );

  if (token) {
    authorizationProvider(token);
  }

  useEffect(() => {
    refreshToken();
  }, []);

  if (refreshLoading) return <Loader />;

  return (
    <>
      <BrowserRouter>
        <main className='main'>
          <Routes>
            <Route path='/auth' element={<HomePage />} />
            <Route
              path='/'
              element={
                <AuthProvider>
                  <ChatPage />
                </AuthProvider>
              }
            />
          </Routes>
        </main>
        <Toaster position='bottom-center' reverseOrder={false} />
      </BrowserRouter>
    </>
  );
};

export default App;
