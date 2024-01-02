import { Suspense, lazy, useEffect, useState } from "react";
import Loader from "./modules/Loader";
const Configurator = lazy(() => import("./modules/Configurator"));
const PlayerScreen = lazy(() => import("./modules/PlayerScreen"));

const reset = () => {
  const root = document.querySelector(":root") as HTMLElement;
  root.style.setProperty("--color-primary", "rgba(255, 255, 255, 1)");
  root.style.setProperty("--color-secondary", "rgba(255, 255, 255, 1)");
  const imgUrl = JSON.parse(
    sessionStorage.getItem("configuration") ?? "{}"
  ).imgUrl;
  URL.revokeObjectURL(imgUrl);
  sessionStorage.clear();
};

function App() {
  const [screen, setScreen] = useState<"config" | "player">("config");

  useEffect(reset, []);

  return (
    <Suspense fallback={<Loader />}>
      {screen === "player" ? (
        <PlayerScreen
          onClose={() => {
            reset();
            setScreen("config");
          }}
        />
      ) : (
        <Configurator
          onComfigurated={() => {
            setScreen("player");
          }}
        />
      )}
    </Suspense>
  );
}

export default App;
