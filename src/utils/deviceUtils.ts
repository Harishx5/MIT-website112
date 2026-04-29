
// Device and performance detection utilities

export const detectWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const hasWebGL = !!(gl && gl instanceof WebGLRenderingContext);
    console.log('WebGL Support:', hasWebGL);
    return hasWebGL;
  } catch (error) {
    console.log('WebGL Detection Error:', error);
    return false;
  }
};

export const detectDevicePerformance = (): 'high' | 'medium' | 'low' => {
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4; // Default to 4 for better support
  
  // Check memory (if available) - properly typed
  const memory = (navigator as any).deviceMemory || 4; // Default to 4GB
  
  // Check if it's mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Performance scoring - more lenient for development
  let score = 0;
  
  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else score += 1;
  
  if (memory >= 8) score += 3;
  else if (memory >= 4) score += 2;
  else score += 1;
  
  if (!isMobile) score += 2;
  
  // In development, be more generous
  const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
  if (isDevelopment) score += 1;
  
  const performance = score >= 6 ? 'high' : score >= 3 ? 'medium' : 'low';
  
  console.log('Device Performance Detection:', {
    cores,
    memory,
    isMobile,
    score,
    performance,
    isDevelopment
  });
  
  return performance;
};

export const shouldUse3DAnimation = (): boolean => {
  const hasWebGL = detectWebGLSupport();
  const performance = detectDevicePerformance();
  
  // More lenient conditions for 3D animation
  const should3D = hasWebGL && (performance === 'high' || performance === 'medium');
  
  console.log('Should Use 3D Animation:', {
    hasWebGL,
    performance,
    should3D,
    environment: process.env.NODE_ENV,
    hostname: window.location.hostname
  });
  
  return should3D;
};

export const getReducedMotionPreference = (): boolean => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  console.log('Prefers Reduced Motion:', prefersReduced);
  return prefersReduced;
};

// Force 3D animation for development/debugging
export const force3DAnimation = (): boolean => {
  const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
  const urlParams = new URLSearchParams(window.location.search);
  const force3D = urlParams.get('force3d') === 'true';
  
  if (force3D) {
    console.log('Forcing 3D Animation via URL parameter');
    return true;
  }
  
  return isDevelopment && detectWebGLSupport();
};
