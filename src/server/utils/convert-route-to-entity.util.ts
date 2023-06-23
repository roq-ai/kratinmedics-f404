const mapping: Record<string, string> = {
  organizations: 'organization',
  'organization-users': 'organization_user',
  'senior-users': 'senior_user',
  'senior-user-organizations': 'senior_user_organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
