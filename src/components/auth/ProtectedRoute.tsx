import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRole } from '@/hooks/useRole';
import { type UserRole } from '@/types/roles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

/**
 * A component that protects routes based on authentication status and user roles.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'EXPLORER', 
  redirectTo = '/auth' 
}) => {
  const { isAuthenticated, can, role } = useRole();
  const location = useLocation();

  if (!isAuthenticated && role === 'GUEST') {
    // Redirect to login if not authenticated
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!can(requiredRole)) {
    // Redirect to unauthorized or dashboard if role is insufficient
    // For now, redirecting to Dashboard as a fallback
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
