import { useState, useEffect } from 'react';
import { PasswordLogin } from './components/PasswordLogin';
import { Calculator } from './components/Calculator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAuthenticated');
    const userRole = sessionStorage.getItem('userRole');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setIsAdmin(userRole === 'admin');
    }
  }, []);

  const handleLogin = (adminStatus: boolean) => {
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  if (!isAuthenticated) {
    return <PasswordLogin onLogin={handleLogin} />;
  }

  return <Calculator onLogout={handleLogout} isAdmin={isAdmin} />;
}

export default App;
