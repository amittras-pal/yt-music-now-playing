import {
  IconMessage,
  IconPlaylistAdd,
  IconShare3,
  IconThumbDown,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { ConfigForm } from "../utils/form";

export default function Actions(
  props: Pick<ConfigForm, "liked" | "likeUnit" | "likeCount" | "commentCount">
) {
  return (
    <div className="bottom-actions">
      <div className="button-group">
        <div className="button">
          {props.liked ? (
            <IconThumbUpFilled size={16} />
          ) : (
            <IconThumbUp size={16} />
          )}{" "}
          {props.likeCount}
          {props.likeUnit}
        </div>
        <div className="separator"></div>
        <div className="button">
          <IconThumbDown size={16} />
        </div>
      </div>
      <div className="button">
        <IconMessage size={16} /> {props.commentCount}
      </div>
      <div className="button">
        <IconPlaylistAdd size={16} /> Save
      </div>
      <div className="button">
        <IconShare3 size={16} /> Share
      </div>
    </div>
  );
}
