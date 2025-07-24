import { useMemo, useState } from 'react';
import { groupEmailsToThreads, type ViewType } from '../utils/utils';
import { MOCKED_EMAILS, type Email, type EmailsType } from '../utils/constants';

function filterEmailsByView(emails: EmailsType, view: ViewType): EmailsType {
  switch (view) {
    case 'inbox':
      return emails.filter((e) => !e.trash && !e.spam);
    case 'starred':
      return emails.filter((e) => e.starred && !e.spam);
    case 'all-mail':
      return emails.filter((e) => !e.spam && !e.trash);
    case 'spam':
      return emails.filter((e) => e.spam);
    case 'trash':
      return emails.filter((e) => e.trash);
    default:
      return emails.filter((e) => !e.spam && !e.trash);
  }
}

function updateEmailById(
  emails: EmailsType,
  id: string,
  updater: (email: Email) => Email
): EmailsType {
  return emails.map((email) => (email.id === id ? updater(email) : email));
}

export function useEmailManager(currentView: ViewType) {
  const [emails, setEmails] = useState<EmailsType>(MOCKED_EMAILS);

  const counts = useMemo(() => {
    const threads = groupEmailsToThreads(emails);

    return threads.reduce(
      (acc, thread) => {
        const latest = thread.reduce((a, b) =>
          new Date(a.time).getTime() > new Date(b.time).getTime() ? a : b
        );

        if (latest.unread) {
          if (!latest.spam) acc.unreadNotSpam++;
          if (latest.starred) acc.starredUnread++;
          if (latest.spam) acc.spamUnread++;
          if (latest.trash) acc.trashUnread++;
        }

        return acc;
      },
      {
        unreadNotSpam: 0,
        starredUnread: 0,
        spamUnread: 0,
        trashUnread: 0,
      }
    );
  }, [emails]);

  const filteredEmails = useMemo(
    () => filterEmailsByView(emails, currentView),
    [emails, currentView]
  );

  const toggleStar = (id: string) => {
    setEmails((prev) =>
      updateEmailById(prev, id, (email) => ({
        ...email,
        starred: !email.starred,
      }))
    );
  };

  const readEmail = (id: string) => {
    const target = emails.find((email) => email.id === id);
    if (!target) return;

    const rootId = target.rootId ?? target.id;

    setEmails((prev) =>
      prev.map((email) =>
        (email.id === rootId || email.rootId === rootId) && email.unread
          ? { ...email, unread: false }
          : email
      )
    );
  };

  const trashEmail = (id: string) => {
    setEmails((prev) =>
      updateEmailById(prev, id, (email) => ({ ...email, trash: !email.trash }))
    );
  };

  const spamEmail = (id: string) => {
    setEmails((prev) =>
      updateEmailById(prev, id, (email) => ({ ...email, spam: !email.spam }))
    );
  };

  return {
    emails,
    filteredEmails,
    counts,
    setEmails,
    toggleStar,
    readEmail,
    trashEmail,
    spamEmail,
  };
}
