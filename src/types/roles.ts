export type UserRole =
  | 'GUEST'
  | 'EXPLORER'
  | 'BUILDER'
  | 'CREATOR_ELITE'
  | 'FACILITATOR'
  | 'ADMIN';

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  GUEST: 0,
  EXPLORER: 1,
  BUILDER: 2,
  CREATOR_ELITE: 3,
  FACILITATOR: 4,
  ADMIN: 5,
};

/**
 * Checks if the user's role meets or exceeds the required role.
 */
export function hasAccess(userRole: UserRole, required: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[required];
}
