import { LoginI18n, LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';
import { useContext, useState } from 'react';
import {AuthContext} from "Frontend/utils/useAuth";
import { login } from 'Frontend/utils/auth';
import {Navigate} from 'react-router';

const loginI18nDefault: LoginI18n = {
  form: {
    title: 'Log in',
    username: 'Username',
    password: 'Password',
    submit: 'Log in',
    forgotPassword: 'Forgot password',
  },
  header: { title: 'RecipeDB', description: 'Login to recipe database' },
  errorMessage: {
    title: 'Incorrect username or password',
    message: 'Check that you have entered the correct username and password and try again.',
  },
};

export default function LoginView() {
  const { state, authenticate } = useContext(AuthContext);
  const [hasError, setError] = useState<boolean>();
  const [url, setUrl] = useState<string>();

  if (state.user && url) {
    const path = new URL(url, document.baseURI).pathname;
    return <Navigate to={path} replace />;
  }

  return (
      <LoginOverlay
          opened
          error={hasError}
          noForgotPassword
          i18n={loginI18nDefault}
          onLogin={async ({ detail: { username, password } }) => {
            const { defaultUrl, error, redirectUrl } = await login(username, password, authenticate);

            if (error) {
              setError(true);
            } else {
              setUrl(redirectUrl ?? defaultUrl ?? '/');
            }
          }}
      />
  );
}
