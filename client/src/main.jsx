import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import Router here
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter> {/* ✅ Wrap everything inside Router here */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
