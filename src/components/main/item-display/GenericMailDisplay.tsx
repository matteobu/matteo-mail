import type { EmailsType } from '../../../utils/constants';
import { MailListItem } from './MailListItem';

type Props = {
  emails: EmailsType;
  title: string;
  emptyText: string;
};

export const GenericMailDisplay = ({ emails, title, emptyText }: Props) => {
  const EmailsListDisplay = () => (
    <div className="mr-[56px] mb-4 flex grow flex-col rounded-2xl bg-white">
      <div className="flex h-[48px] items-center px-4"></div>
      <div>
        {emails.map((email, idx) => (
          <MailListItem
            key={email.id ?? idx}
            sender={email.sender}
            subject={email.subject}
            snippet={email.snippet}
            time={email.time}
            starred={email.starred}
            starredIconSrc={email.starredIconSrc}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {emails.length === 0 ? <p>{emptyText}</p> : <EmailsListDisplay />}
    </div>
  );
};
