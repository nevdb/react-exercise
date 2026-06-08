import { log } from "../../src/utils/log";
import { memo } from "react";

const IconButton = memo(function IconButton({ children, icon, ...props }) {
  log("<IconButton /> rendered", 2);

  const Icon = icon;
  return (
    <button {...props}>
      <Icon className="text-teal-950" />
      <span>{children}</span>
    </button>
  );
});

export default IconButton;
