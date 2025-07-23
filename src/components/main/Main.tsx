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

export type ViewType = 'inbox' | 'starred' | 'all-mail' | 'spam' | 'trash';

const Main = () => {
  const [currentView, setCurrentView] = useState<ViewType>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState<EmailsType>(MOCKED_EMAILS);

  const counts = useMemo(() => {
    return emails.reduce(
      (acc, email) => {
        if (email.unread) {
          if (!email.spam) acc.unreadNotSpam++;
          if (email.starred) acc.starredUnread++;
          if (email.spam) acc.spamUnread++;
          if (email.trash) acc.trashUnread++;
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
      case 'inbox':
        return emails.filter((email) => !email.spam && !email.trash);
      case 'starred':
        return emails.filter(
          (email) => email.starred && !email.spam && !email.trash
        );
      case 'all-mail':
        return emails;
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
      prevEmails.map((email) =>
        email.id === id ? { ...email, starred: !email.starred } : email
      )
    );
  };

  const readEmail = (id: string) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, unread: !email.unread } : email
      )
    );
  };

  const trashEmail = (id: string) => {
    console.log('Trashing email with ID:', id);
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, trash: !email.trash } : email
      )
    );
  };

  const renderContent = () => {
    if (selectedEmail) {
      return (
        <EmailConversation
          email={selectedEmail}
          onTrashEmail={trashEmail}
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
