import { IconDeviceDesktopX } from "@tabler/icons-react";
import "./UnsupportedDevice.scss";

export default function UnsupportedDevide() {
  return (
    <div className="unsupported">
      <div className="text-danger">
        <IconDeviceDesktopX size={124} stroke={1.5} />
      </div>
      <p className="mb-0">We support Mobile Devices Only.</p>
      <p className="text-muted small">
        Please use a mobile devide in the portrait orientation.
      </p>
    </div>
  );
}
