import { useMemo, useState } from 'react';
import Header from '../Header';
import SidebarMenu from './sidebar/SidebarMenu';
import {
  MOCKED_EMAILS,
  type Email,
  type EmailsType,
} from '../../utils/constants';
import { GenericMailDisplay } from './item-display/GenericMailDisplay';
import { EmailConversation } from './item-display/EmailConversation';
import { groupEmailsToThreads } from '../../utils/utils';

export type ViewType = 'inbox' | 'starred' | 'all-mail' | 'spam' | 'trash';

const Main = () => {
  const [currentView, setCurrentView] = useState<ViewType>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState<EmailsType>(MOCKED_EMAILS);

  const counts = useMemo(() => {
    const threads = groupEmailsToThreads(emails);

    return threads.reduce(
      (acc, thread) => {
        // Get the latest email in the thread
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

  const filteredEmails = (() => {
    switch (currentView) {
      case 'inbox': {
        const inboxEmails = emails.filter((e) => !e.trash && !e.spam);
        return inboxEmails;
      }
      case 'starred': {
        const starredEmail = emails.filter((e) => e.starred && !e.spam);
        return starredEmail;
      }
      case 'all-mail':
        return emails.filter((email) => !email.spam);
      case 'spam':
        return emails.filter((email) => email.spam);
      case 'trash':
        return emails.filter((email) => email.trash);
      default:
        return emails.filter((email) => !email.spam && !email.trash);
    }
  })();

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleBack = () => {
    setSelectedEmail(null);
  };

  const toggleStar = (id: string) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) => {
        if (email.id === id) {
          return { ...email, starred: !email.starred };
        }
        return email;
      })
    );
  };

  const readEmail = (id: string) => {
    setEmails((prevEmails) => {
      const target = prevEmails.find((email) => email.id === id);
      if (!target) return prevEmails;

      const rootId = target.rootId ?? target.id;

      return prevEmails.map((email) => {
        const isInThread = email.id === rootId || email.rootId === rootId;
        return isInThread && email.unread ? { ...email, unread: false } : email;
      });
    });
  };

  const trashEmail = (id: string) => {
    console.log('Trashing email with ID:', id);
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, trash: !email.trash } : email
      )
    );
  };

  const spamEmail = (id: string) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, spam: !email.spam } : email
      )
    );
  };

  const renderContent = () => {
    if (selectedEmail) {
      return (
        <EmailConversation
          emails={filteredEmails}
          email={selectedEmail}
          onTrashEmail={trashEmail}
          onToggleStar={toggleStar}
          onSpamToggle={spamEmail}
          onBack={handleBack}
        />
      );
    }

    return (
      <GenericMailDisplay
        emails={filteredEmails}
        title={currentView.replace('-', ' ').toUpperCase()}
        emptyText={`No ${currentView} emails found.`}
        onEmailClick={handleEmailClick}
        onReadEmail={readEmail}
        onToggleStar={toggleStar}
      />
    );
  };

  return (
    <div className="flex min-h-screen grow flex-col bg-[rgb(248,250,253)]">
      <Header />
      <div className="flex grow">
        <SidebarMenu
          counts={counts}
          currentView={currentView}
          onViewChange={(view) => {
            setCurrentView(view);
            setSelectedEmail(null);
          }}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default Main;
