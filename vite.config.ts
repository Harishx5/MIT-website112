<<<<<<< HEAD

=======
>>>>>>> 4eca0755c64cb5f35907e8694bd9712fb0ac5ac1
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
<<<<<<< HEAD
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
=======
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
>>>>>>> 4eca0755c64cb5f35907e8694bd9712fb0ac5ac1
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-slot', '@radix-ui/react-dialog', '@radix-ui/react-tabs'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'home-components': [
            './src/components/Home/ServicesSection',
            './src/components/Home/AboutSection',
            './src/components/Home/ClientReviews',
            './src/components/Home/TrustedPartners',
            './src/components/Home/FAQSection'
          ],
          'portfolio-components': [
            './src/components/Portfolio/PortfolioGrid',
            './src/components/Portfolio/PortfolioCategories'
          ],
          'case-study-components': [
            './src/pages/CaseStudies',
            './src/components/Home/CaseStudyModal'
          ],
          'internship-components': [
            './src/pages/InternshipsTraining',
            './src/components/Internship/InternshipApplicationModal',
            './src/hooks/useInternshipApplications'
          ],
          'admin-components': [
            './src/components/Admin/AdminCaseStudies',
            './src/components/Admin/AdminBlogPosts',
            './src/components/Admin/AdminPortfolioProjects'
          ]
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '') : 'chunk';
          return `assets/[name]-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(css)$/i.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    chunkSizeWarningLimit: 800,
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    } : undefined,
    reportCompressedSize: false,
    sourcemap: mode === 'development',
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      '@radix-ui/react-slot',
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ],
    exclude: []
  },
  define: {
    // Fix React Three Fiber compatibility
    global: 'globalThis',
  },
  // Add specific handling for development
  ...(mode === 'development' && {
    esbuild: {
      target: 'es2020',
    },
  }),
=======
>>>>>>> 4eca0755c64cb5f35907e8694bd9712fb0ac5ac1
}));
