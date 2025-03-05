import AppRoutes from "./routes/AppRoutes";
import ThemeProvider from "./theme";

const App = () => {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
