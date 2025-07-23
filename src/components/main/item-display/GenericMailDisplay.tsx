import type { Email, EmailsType } from '../../../utils/constants';
import { MailListItem } from './MailListItem';

type Props = {
  emails: EmailsType;
  title: string;
  emptyText: string;
  onEmailClick?: (email: Email) => void;
  onToggleStar?: (id: string) => void;
  onReadEmail?: (id: string) => void;
};

export const GenericMailDisplay = ({
  emails,
  title,
  emptyText,
  onEmailClick,
  onToggleStar,
  onReadEmail,
}: Props) => (
  <div className="mr-[56px] mb-4 flex grow flex-col rounded-2xl bg-white">
    <div className="px-4 py-2 text-xl font-semibold">{title}</div>
    <div>
      {emails.length === 0 ? (
        <div className="text-gray-500 px-4 py-8">{emptyText}</div>
      ) : (
        [...emails]
          .sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
          )
          .map((email) => (
            <MailListItem
              key={email.id}
              {...email}
              onClick={() => {
                onEmailClick?.(email);
                onReadEmail?.(email.id);
              }}
              onToggleStar={onToggleStar}
            />
          ))
      )}
    </div>
  </div>
);
