import { formatEmailTime } from '../../../utils/utils';
import { StarButton } from '../sidebar/StarButton';

export const MailListItem = ({
  id,
  starred,
  senderName,
  subject,
  body,
  time,
  unread,
  countReplies,
  onClick,
  onToggleStar,
}: {
  id: string;
  starred?: boolean;
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  time: string;
  unread: boolean;
  countReplies?: number;
  onClick?: () => void;
  onToggleStar?: (id: string) => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex h-[40px] cursor-pointer items-center gap-3 border-b border-gray-200 px-4 text-sm hover:z-10 hover:shadow-md ${
        unread ? 'bg-gray-50' : ''
      }`}>
      <StarButton
        starred={starred ?? false}
        onToggleStar={onToggleStar}
        id={id}
      />
      <div
        className={`w-[200px] shrink-0 truncate ${
          unread ? 'font-bold' : 'font-normal'
        }`}>
        <div>
          {senderName}
          {(countReplies ?? 1) > 1 && ` (${countReplies ?? 1})`}
        </div>
      </div>
      <div className="w-0 flex-1 grow truncate text-sm">
        <span className={`${unread ? 'font-semibold' : 'font-normal'}`}>
          {subject}
        </span>
        <span className="text-gray-500"> - {body}</span>
      </div>
      <div className="shrink-0 text-xs text-gray-500">
        {formatEmailTime(time)}
      </div>
    </div>
  );
};
