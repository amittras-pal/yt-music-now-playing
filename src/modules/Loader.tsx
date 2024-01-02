import { IconLoader3 } from "@tabler/icons-react";
import "./Loader.scss";

export default function Loader() {
  return (
    <div className="loader text-primary">
      <IconLoader3 size={240} stroke={1.5} className="spin" />
    </div>
  );
}
