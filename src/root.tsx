import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/layout/router-head";

import "./global.css";
import "./pretendard-variable.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap"
        />
        <RouterHead />
      </head>
      <body lang="ko">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
