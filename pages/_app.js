import "../styles/globals.css";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/config/createEmotionCache";
import AuthProvider from "../src/auth/useAuth";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </CacheProvider>
  );
}

export default MyApp;
