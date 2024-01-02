import {
  IconArrowsShuffle,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
  IconRepeat,
  IconRepeatOnce,
} from "@tabler/icons-react";
import { ConfigForm, getElapsedTime } from "../utils/form";

export default function Player(
  props: Pick<
    ConfigForm,
    "playState" | "loopState" | "timeMin" | "timeSec" | "elapsed"
  >
) {
  return (
    <div className="player">
      <div className="track">
        <div className="fill" style={{ width: `${props.elapsed}%` }} />
        <div className="thumb" style={{ left: `${props.elapsed}%` }} />
      </div>
      <div className="time">
        <span className="elapsed">
          {getElapsedTime(
            props.timeMin.toString(),
            props.timeSec.toString(),
            props.elapsed
          )}
        </span>
        <span className="total">
          {props.timeMin}:{props.timeSec}
        </span>
      </div>
      <div className="controls">
        <IconArrowsShuffle size={24} />
        <IconPlayerSkipBackFilled size={24} />
        <div className="play-button">
          {props.playState ? (
            <IconPlayerPlayFilled size={24} />
          ) : (
            <IconPlayerPauseFilled size={24} />
          )}
        </div>
        <IconPlayerSkipForwardFilled size={24} />
        {props.loopState ? (
          <IconRepeatOnce size={24} />
        ) : (
          <IconRepeat size={24} />
        )}
      </div>
    </div>
  );
}
