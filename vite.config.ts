// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  css: {
    fileName: "styles.css", // Output CSS file name
  },
  build: {
    assetsDir: "assets",
    rollupOptions: {
      input: {
        home: "/index.html",
        admissions: "/admissions.html",
        programs: "/programs.html",
        tuition: "/tuition.html",
        studentServices: "/student-services.html",
        successStories: "/success-stories.html",
      },
      output: {
        entryFileNames: "app.js", // Output JS file name
      },
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
