import { useMemo } from "react";
import Actions from "../components/Actions";
import Cover from "../components/Cover";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Info from "../components/Info";
import Player from "../components/Player";
import { ConfigForm } from "../utils/form";
import "./PlayerScreen.scss";

const setGradient = (colors: string[]) => {
  const root = document.querySelector(":root") as HTMLElement;
  root.style.setProperty("--color-primary", colors[1]);
  root.style.setProperty("--color-secondary", colors[0]);
};

export default function PlayerScreen(props: { onClose: () => void }) {
  const config = useMemo(() => {
    const config = JSON.parse(
      sessionStorage.getItem("configuration") ?? "{}"
    ) as ConfigForm;
    setGradient(config.colors ?? []);
    return config;
  }, []);

  return (
    <div className="container container-sm now-playing">
      <Header onClose={props.onClose} />
      <Cover imgUrl={config.imgUrl} />
      <Info title={config.title} artist={config.artist} />
      <Actions
        commentCount={config.commentCount}
        likeCount={config.likeCount}
        likeUnit={config.likeUnit}
        liked={config.liked}
      />
      <Player
        loopState={config.loopState}
        playState={config.playState}
        timeMin={config.timeMin}
        timeSec={config.timeSec}
        elapsed={config.elapsed}
      />
      <Footer />
    </div>
  );
}
