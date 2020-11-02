export const webServerURL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000/web/security-management-studio-web'
    : 'http://127.0.0.1:8080/security-management-studio-web'
