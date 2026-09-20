export default function Modal({ open, title, children, onClose, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4" onMouseDown={onClose}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-container-lowest shadow-2xl border border-outline-variant/30" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-space-lg border-b border-outline-variant/20">
          <h2 className="font-title-lg text-title-lg text-on-surface font-semibold">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-outline hover:bg-surface-container hover:text-on-surface" aria-label="Close">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-space-lg">{children}</div>
        {footer && <div className="modal-footer-responsive flex flex-wrap justify-end gap-2 p-space-lg border-t border-outline-variant/20">{footer}</div>}
      </div>
    </div>
  );
}
