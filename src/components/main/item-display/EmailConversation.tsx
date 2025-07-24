import { useState } from 'react';
import type { Email, EmailsType } from '../../../utils/constants';
import { formatDateTimeWithAgo, getEmailThread } from '../../../utils/utils';
import { StarButton } from '../sidebar/StarButton';

type Props = {
  emails: EmailsType;
  email: Email;
  onBack?: () => void;
  onTrashEmail?: (id: string) => void;
  onToggleStar?: (id: string) => void;
  onSpamToggle?: (id: string) => void;
};

export const EmailConversation = ({
  emails,
  email,
  onBack,
  onTrashEmail,
  onToggleStar,
  onSpamToggle,
}: Props) => {
  const fullThread = getEmailThread(emails, email);

  const [selectedEmailIds, setSelectedEmailIds] = useState<Set<string>>(
    new Set()
  );

  const renderHeader = (msg: Email) => {
    const isDetailed = selectedEmailIds.has(msg.id) || fullThread.length === 1;

    return (
      <div className="mb-2 flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm sm:text-base font-semibold">
            {isDetailed ? (
              <>
                {msg.senderName}{' '}
                <span className="font-normal text-xs text-gray-500">
                  &lt;{msg.senderEmail}&gt;
                </span>
              </>
            ) : (
              msg.senderName
            )}
          </div>
          {isDetailed && (
            <div className="text-sm text-gray-600 italic mt-1">to me</div>
          )}
        </div>
        <div className="flex items-center text-xs text-gray-500 sm:ml-4 sm:self-center space-x-2">
          <span>{formatDateTimeWithAgo(msg.time)}</span>
          <StarButton
            starred={msg.starred}
            onToggleStar={() => onToggleStar?.(msg.id)}
            id={msg.id}
          />
        </div>
      </div>
    );
  };

  const renderBody = (msg: Email) => {
    const isDetailed =
      selectedEmailIds.has(msg.id) ||
      fullThread.length === 1 ||
      msg.id === fullThread[fullThread.length - 1].id;

    return (
      <div
        className={`text-sm whitespace-pre-line ${
          isDetailed ? 'text-gray-800' : 'text-gray-600 cursor-pointer'
        }`}
        onClick={() => {
          setSelectedEmailIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(msg.id)) {
              newSet.delete(msg.id);
            } else {
              newSet.add(msg.id);
            }
            return newSet;
          });
        }}>
        {isDetailed
          ? msg.body
          : msg.body.slice(0, 100) + (msg.body.length > 100 ? '...' : '')}
      </div>
    );
  };

  return (
    <div className="mr-[56px] p-2 flex grow flex-col rounded-2xl bg-white">
      {onBack && (
        <div className="mb-4 flex items-center gap-2">
          {/* Back Button */}
          <button
            className="w-max px-3 py-1 text-sm rounded-2xl hover:bg-gray-300"
            onClick={() => {
              setSelectedEmailIds(new Set());
              onBack();
            }}>
            &lt;
          </button>

          {!email.spam && !email.trash && (
            <>
              <button
                aria-label="Mark as spam"
                className="rounded px-3 py-1 text-sm"
                onClick={() => {
                  fullThread.forEach((msg) => onSpamToggle?.(msg.id));
                  onBack();
                }}>
                <img
                  src="/icons/icon-spam.png"
                  alt="Spam"
                />
              </button>

              <button
                aria-label="Trash email"
                className="rounded px-3 py-1 text-sm"
                onClick={() => {
                  fullThread.forEach((msg) => onTrashEmail?.(msg.id));
                  onBack();
                }}>
                <img
                  src="/icons/icon-trash.png"
                  alt="Trash"
                />
              </button>
            </>
          )}

          {email.spam && (
            <>
              <button
                aria-label="Not spam"
                className="rounded px-3 py-1 text-sm hover:bg-gray-200 transition-colors"
                onClick={() => {
                  fullThread.forEach((msg) => onSpamToggle?.(msg.id));
                  onBack();
                }}>
                Not Spam
              </button>
            </>
          )}

          {email.trash && (
            <>
              <button
                aria-label="Restore from Trash"
                className="rounded px-3 py-1 text-sm hover:bg-gray-200 transition-colors"
                onClick={() => {
                  fullThread.forEach((msg) => onTrashEmail?.(msg.id));
                  onBack();
                }}>
                Move to Inbox
              </button>

              <button
                aria-label="Mark as spam"
                className="rounded px-3 py-1 text-sm"
                onClick={() => {
                  fullThread.forEach((msg) => onSpamToggle?.(msg.id));
                  onBack();
                }}>
                <img
                  src="/icons/icon-spam.png"
                  alt="Spam"
                />
              </button>
            </>
          )}
        </div>
      )}

      <div className="ml-[52px] text-[22px] font-normal mb-4">
        {email.subject}
      </div>

      {fullThread.map((msg) => (
        <div
          key={msg.id}
          className="mb-6 rounded-lg bg-white p-4 shadow-sm flex gap-4 items-start">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white font-semibold"
            aria-label={`Avatar for ${msg.senderName}`}>
            {msg.senderName
              .split(' ')
              .map((namePart) => namePart.charAt(0).toUpperCase())
              .slice(0, 2)
              .join('')}
          </div>

          <div className="flex-1">
            {renderHeader(msg)}
            {renderBody(msg)}
          </div>
        </div>
      ))}
    </div>
  );
};
