import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      className="w-[min(92vw,36rem)] rounded-2xl border border-slate-200/40 bg-slate-50 p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/65"
      ref={dialog}
      onClose={onClose}
    >
      {open ? children : null}
    </dialog>,
    document.getElementById("modal"),
  );
}

export default Modal;
