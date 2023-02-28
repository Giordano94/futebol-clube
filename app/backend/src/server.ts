import { App } from './app';
import 'dotenv/config';

const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);
console.log(`Server running on port ${PORT}`);
