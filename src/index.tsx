import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme  } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const queryClient = new QueryClient();


root.render(
  <div>
   <QueryClientProvider client={queryClient} >
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
   </QueryClientProvider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
