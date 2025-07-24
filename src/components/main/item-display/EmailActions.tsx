import type { Email } from '../../../utils/constants';

type Props = {
  email: Email;
  fullThread: Email[];
  onBack: () => void;
  onSpamToggle?: (id: string) => void;
  onTrashEmail?: (id: string) => void;
};

export const EmailActions = ({
  email,
  fullThread,
  onBack,
  onSpamToggle,
  onTrashEmail,
}: Props) => {
  const handleSpamToggle = () => {
    fullThread.forEach((msg) => onSpamToggle?.(msg.id));
    onBack();
  };

  const handleTrashToggle = () => {
    fullThread.forEach((msg) => onTrashEmail?.(msg.id));
    onBack();
  };

  return (
    <div className="flex gap-2">
      {!email.spam && !email.trash && (
        <>
          <button
            aria-label="Mark as spam"
            className="rounded px-3 py-1 text-sm"
            onClick={handleSpamToggle}>
            <img
              src="/icons/icon-spam.png"
              alt="Spam"
            />
          </button>

          <button
            aria-label="Trash email"
            className="rounded px-3 py-1 text-sm"
            onClick={handleTrashToggle}>
            <img
              src="/icons/icon-trash.png"
              alt="Trash"
            />
          </button>
        </>
      )}

      {email.spam && (
        <button
          aria-label="Not spam"
          className="rounded px-3 py-1 text-sm hover:bg-gray-200 transition-colors"
          onClick={handleSpamToggle}>
          Not Spam
        </button>
      )}

      {email.trash && (
        <>
          <button
            aria-label="Restore from Trash"
            className="rounded px-3 py-1 text-sm hover:bg-gray-200 transition-colors"
            onClick={handleTrashToggle}>
            Move to Inbox
          </button>

          <button
            aria-label="Mark as spam"
            className="rounded px-3 py-1 text-sm"
            onClick={handleSpamToggle}>
            <img
              src="/icons/icon-spam.png"
              alt="Spam"
            />
          </button>
        </>
      )}
    </div>
  );
};
