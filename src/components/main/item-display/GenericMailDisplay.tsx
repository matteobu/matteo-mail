import type { Email, EmailsType } from '../../../utils/constants';
import { groupEmailsToThreads } from '../../../utils/utils';
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
  emptyText,
  onEmailClick,
  onToggleStar,
  onReadEmail,
}: Props) => {
  const groupedEmails = groupEmailsToThreads(emails);

  return (
    <div className="mr-[56px] mb-4 flex grow flex-col rounded-2xl bg-white">
      <div className="px-4 mt-6 py-2 text-xl font-semibold"></div>
      <div>
        {emails.length === 0 ? (
          <div className="text-gray-500 px-4 py-8">{emptyText}</div>
        ) : (
          groupedEmails
            .map((thread) => {
              const latest = thread.reduce((a, b) =>
                new Date(a.time) > new Date(b.time) ? a : b
              );
              const root = thread.find((e) => !e.rootId) ?? thread[0];
              const senderNames = Array.from(
                new Set(thread.map((e) => e.senderName))
              ).join(', ');
              const isStarred = thread.some((e) => e.starred);
              const unread = thread.some((e) => e.unread);

              return {
                ...latest,
                subject: root.subject,
                body: latest.body,
                senderName: senderNames,
                threadCount: thread.length,
                starred: isStarred,
                unread,
              };
            })
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
                countReplies={email.threadCount}
              />
            ))
        )}
      </div>
    </div>
  );
};
