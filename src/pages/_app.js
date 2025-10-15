import '@/styles/globals.css';

import { Provider } from 'react-redux';

import { ThemeProvider } from '@/components/theme-provider';
import { store } from '@/redux/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
