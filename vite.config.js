import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    define: {
        global: {
            appName: "my-custom-name"
        }
    },
};

export default config;
