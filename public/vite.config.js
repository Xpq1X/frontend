import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'frontend/src/main.js', // assuming this is where your entry file is for React
                'frontend/src/style.css', // you can add CSS if needed
            ],
            refresh: true,
        }),
        react(), // Make sure you have React plugin for Vite if using React
    ],
});
