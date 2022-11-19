import "../styles/globals.css";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/config/createEmotionCache";
import AuthProvider from "../src/auth/useAuth";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/config/themeConfig";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
