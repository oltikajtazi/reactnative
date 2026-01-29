import { registerRootComponent } from 'expo';

import App from './App';

// Polyfill for setImmediate (needed for react-native-swiper)
if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (callback) => setTimeout(callback, 0);
}

// Suppress the pointerEvents deprecation warning from react-navigation
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes?.('pointerEvents is deprecated')) {
    return;
  }
  originalWarn(...args);
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
