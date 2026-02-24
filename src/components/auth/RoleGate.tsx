import * as React from 'react';
import { useRole } from '@/hooks/useRole';
import { type UserRole } from '@/types/roles';

interface RoleGateProps {
  children: React.ReactNode;
  requiredRole: UserRole;
  fallback?: React.ReactNode;
}

/**
 * Conditionally renders children only if the user has the required role.
 */
export const RoleGate: React.FC<RoleGateProps> = ({ 
  children, 
  requiredRole, 
  fallback = null 
}) => {
  const { can } = useRole();

  if (!can(requiredRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
