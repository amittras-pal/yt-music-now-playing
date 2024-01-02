import { InferType, array, bool, number, object, string } from "yup";

export const configSchema = object().shape({
  imgUrl: string().required(),
  title: string().required("Song title required."),
  artist: string().required("Song artists required."),
  colors: array().min(2).max(2),
  playState: bool(),
  loopState: bool(),
  liked: bool(),
  likeUnit: string().oneOf(["K", "M"]),
  likeCount: number().min(1).required(),
  commentCount: number().required().max(999),
  timeMin: number().required("").min(1),
  timeSec: number().required("").min(1).max(59),
  elapsed: number().min(1).max(100).required(""),
});

export type ConfigForm = InferType<typeof configSchema>;

export function getElapsedTime(min: string, sec: string, elapsed: number) {
  const seconds = parseInt(min) * 60 + parseInt(sec);
  const used = Math.floor((elapsed / 100) * seconds);
  return `${Math.floor(used / 60)}:${(used % 60).toString().padStart(2, "0")}`;
}
