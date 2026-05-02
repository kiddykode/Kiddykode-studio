import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Shield } from 'lucide-react';
import { type UserRole } from '@/types/roles';

const TEST_IDENTITIES = [
  { name: 'Guest', role: 'GUEST' as UserRole, email: '' },
  { name: 'Explorer', role: 'EXPLORER' as UserRole, email: 'explorer@kiddykode.com' },
  { name: 'Builder', role: 'BUILDER' as UserRole, email: 'builder@kiddykode.com' },
  { name: 'Creator Elite', role: 'CREATOR_ELITE' as UserRole, email: 'creator@kiddykode.com' },
  { name: 'Facilitator', role: 'FACILITATOR' as UserRole, email: 'teacher@kiddykode.com' },
  { name: 'Admin', role: 'ADMIN' as UserRole, email: 'admin@kiddykode.com' },
];

/**
 * A dev-only component to quickly switch between user roles for testing.
 */
export const DevIdentitySwitcher: React.FC = () => {
  const { user, setUser, clearUser } = useAuthStore();

  const handleSwitch = (identity: typeof TEST_IDENTITIES[0]) => {
    if (identity.role === 'GUEST') {
      clearUser();
    } else {
      setUser({
        id: `test_${identity.role.toLowerCase()}`,
        name: identity.name,
        email: identity.email,
        role: identity.role,
      });
    }
  };

  // Only show in development (Vite exposes import.meta.env.PROD, not process.env)
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full shadow-lg bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-white flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Dev Identity Switcher</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {TEST_IDENTITIES.map((identity) => (
            <DropdownMenuItem 
              key={identity.role} 
              onClick={() => handleSwitch(identity)}
              className="flex justify-between items-center"
            >
              <span>{identity.name}</span>
              {user?.role === identity.role && <span className="h-2 w-2 rounded-full bg-green-500" />}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs text-muted-foreground cursor-default">
            Current: {user?.role ?? 'GUEST'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
