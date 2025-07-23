import { StarButton } from '../sidebar/StarButton';

export const MailListItem = ({
  starred,
  sender,
  subject,
  snippet,
  time,
}: {
  starred?: boolean;
  sender: string;
  subject: string;
  snippet: string;
  time: string;
  starredIconSrc: string;
}) => (
  <div
    className={`relative flex h-[40px] cursor-pointer items-center gap-3 border-b border-gray-200 px-4 text-sm hover:z-10 hover:shadow-md ${
      starred ? 'bg-gray-50' : ''
    }`}>
    <StarButton starred={starred ?? false} />
    <div className="w-[200px] shrink-0 truncate font-bold">{sender}</div>
    <div className="w-0 flex-1 grow truncate text-sm">
      <span className="font-semibold">{subject}</span>
      <span className="text-gray-500"> - {snippet}</span>
    </div>
    <div className="shrink-0 text-xs text-gray-500">{time}</div>
  </div>
);
