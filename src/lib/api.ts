/**
 * Utility to construct API URLs robustly.
 * Handles environment variables and ensures no double-slashes.
 */
export const getApiUrl = (path: string): string => {
  const baseUrl = import.meta.env.VITE_API_URL || '';
  
  // Clean the path (remove leading slash)
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // If no baseUrl, return relative path with leading slash
  if (!baseUrl) {
    return `/${cleanPath}`;
  }
  
  // Ensure baseUrl doesn't end with a slash
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${cleanBaseUrl}/${cleanPath}`;
};
