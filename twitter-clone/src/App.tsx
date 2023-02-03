import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Error404 from './components/ErrorPage/Error404';
import OtherError from './components/ErrorPage/OtherError';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Tweets from './components/Tweets/Tweets';
import { authenticatedUserAtom } from './recoil/atom';

function App() {
  const { isAuthenticated } = useRecoilValue(authenticatedUserAtom);
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginForm />}
      />
      <Route
        path="/register"
        element={<RegisterForm />}
      />
      <Route
        path="/404"
        element={<Error404 />}
      />
      <Route
        path="/error"
        element={<OtherError />}
      />
            {isAuthenticated && <Route
        path="/tweets"
        element={<Tweets />}
      />
      }
    </Routes>
  );
}

export default App;

