import { useState } from 'react';
import type { Email, EmailsType } from '../../../utils/constants';
import { getEmailThread } from '../../../utils/utils';
import { EmailActions } from './EmailActions';
import { renderBody, renderHeader } from './EmailRenders';

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
          <EmailActions
            email={email}
            fullThread={fullThread}
            onBack={onBack}
            onSpamToggle={onSpamToggle}
            onTrashEmail={onTrashEmail}
          />
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
            {renderHeader(msg, selectedEmailIds, fullThread, onToggleStar)}
            {renderBody(msg, selectedEmailIds, fullThread, setSelectedEmailIds)}
          </div>
        </div>
      ))}
    </div>
  );
};
