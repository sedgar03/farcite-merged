export const getBackendUrl = (path: string): string => {
  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  const hostname = window.location.hostname;
  const port = '8080'; // Adjust this if your backend port changes
  return `${protocol}//${hostname}:${port}${path}`;
};