interface Props {
  flagSource: string;
  open: boolean;
  onClose: () => void;
}

export default function FlagImageModal({ flagSource, open, onClose }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <img
        src={flagSource}
        alt="Country flag large"
        style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: '1rem', boxShadow: '0 4px 32px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}
