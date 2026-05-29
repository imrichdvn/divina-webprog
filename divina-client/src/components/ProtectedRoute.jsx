import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles?.length) {
    const userType = localStorage.getItem('type');
    if (!allowedRoles.includes(userType)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
