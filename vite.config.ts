import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
	base: '/memcrab-test-task/',
	plugins: [react(), babel({ presets: [reactCompilerPreset()] }), svgr()],
});
