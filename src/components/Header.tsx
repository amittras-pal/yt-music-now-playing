import {
  IconCast,
  IconChevronDown,
  IconDotsVertical,
} from "@tabler/icons-react";

export default function Header(props: { onClose: () => void }) {
  return (
    <div className="header">
      <IconChevronDown size={16} onClick={props.onClose} />
      <div className="tabs">
        <div className="tab active">Song</div>
        <div className="tab">Video</div>
      </div>
      <div className="actions">
        <IconCast size={16} />
        <IconDotsVertical size={16} />
      </div>
    </div>
  );
}
