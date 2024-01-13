export let HOST = 'http://localhost:3001';

if (process.env.NODE_ENV === 'production') {
  HOST = '';
}