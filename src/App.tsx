import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import routes from "./routes/app.routes";
import { store, persistor } from "./store";
import ThemeProvider from "./contexts/theme.context";
import I18nProvider from "./contexts/i18n.context";
import ErrorBoundary from "./containers/error-boundary/ErrorBoundary";
import SnackbarWrapper from "./components/common/snackbar-provider/SnackbarProvider";

import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<div />}>
            <ThemeProvider>
              <I18nProvider>
                <SnackbarWrapper>
                  <BrowserRouter>
                    <Routes>
                      {routes.map(({ key, path, element, children }) => (
                        <Route key={key} path={path} element={element}>
                          {children.map(({ ...others }) => (
                            <Route {...others} />
                          ))}
                        </Route>
                      ))}
                    </Routes>
                  </BrowserRouter>
                </SnackbarWrapper>
              </I18nProvider>
            </ThemeProvider>
          </Suspense>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
