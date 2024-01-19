import './App.css';
import { useEffect } from "react";
import {
  useAuth,
  useLoginWithRedirect,
  AdminPortal,
  useTenantsState
} from "@frontegg/react";
import { ContextHolder, FronteggContext } from "@frontegg/rest-api";
import { Switch, useHistory, Route } from "react-router-dom";


function Private() {
  const { isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('user is not logged-on. going to loginWithRedirect')
      localStorage.setItem('_REDIRECT_AFTER_LOGIN_', window.location.pathname);
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  return isAuthenticated ? (
    <div>
      <h1>Private</h1>
      <button onClick={() => history.push('/')}>Go home</button>
    </div>
  ) : (
    <div />
  );
}

function Home() {
  const { user, isAuthenticated } = useAuth();
  const tenantsState = useTenantsState();
  const loginWithRedirect = useLoginWithRedirect();
  const history = useHistory();

  console.log('user - ', user);
  console.log('isAuthenticated - ', isAuthenticated);
  console.log('tenants - ', tenantsState?.tenants);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('user is not logged-on. going to loginWithRedirect')
      localStorage.setItem('_REDIRECT_AFTER_LOGIN_', window.location.pathname);
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const originalRoute = localStorage.getItem('_REDIRECT_AFTER_LOGIN_');
  console.log('originalRoute - ', originalRoute);
  const token = FronteggContext.getAccessToken();
  console.log('token - ', token);
  if (isAuthenticated && originalRoute) {
    history.push(originalRoute);
    localStorage.removeItem('_REDIRECT_AFTER_LOGIN_');
  }

  return (
    <div style={{ 
      backgroundImage: `url("https://images.pexels.com/photos/268415/pexels-photo-268415.jpeg?auto=compress&cs=tinysrgb&w=600")` 
    }} className="App">
      {isAuthenticated ? (
        <div>
          <div align="right">
            <span>You are logged in as: {user?.name}</span>
          </div>
          <h1 align="left">That's my React app!</h1>
          <div>
            <h2>Click the button below to check my access token</h2>
            <button onClick={() => alert(user.accessToken)}>What is my access token?</button>
          </div>
          <div>
            <h2>Click the button below to get Admin portal page</h2>
            <button onClick={() => AdminPortal.show()}>Open admin portal</button>
          </div>
          <div>
            <h2>Click the button below to logout</h2>
            <button onClick={() => logout()}>Click to logout</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Click the button below to login</h2>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
          <button onClick={() => history.push('/private')}>Go to private route</button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/private" component={Private} />
      <Home path="/" />
    </Switch>
  );
}

export default App;
