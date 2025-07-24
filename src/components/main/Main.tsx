import { useState } from 'react';
import Header from '../Header';
import SidebarMenu from './sidebar/SidebarMenu';
import { GenericMailDisplay } from './item-display/GenericMailDisplay';
import { EmailConversation } from './item-display/EmailConversation';
import { useEmailManager } from '../../hooks/useEmailManager';
import type { Email } from '../../utils/constants';

export type ViewType = 'inbox' | 'starred' | 'all-mail' | 'spam' | 'trash';

const Main = () => {
  const [currentView, setCurrentView] = useState<ViewType>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const {
    filteredEmails,
    counts,
    toggleStar,
    readEmail,
    trashEmail,
    spamEmail,
  } = useEmailManager(currentView);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleBack = () => {
    setSelectedEmail(null);
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
