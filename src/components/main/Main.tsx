import { useState } from 'react';

import Header from '../Header';
import SidebarMenu from './sidebar/SidebarMenu';

import { MOCKED_EMAILS, type EmailsType } from '../../utils/constants';
import { GenericMailDisplay } from './item-display/GenericMailDisplay';

export type ViewType = 'inbox' | 'starred' | 'all-mail' | 'spam' | 'trash';

const Main = () => {
  const [currentView, setCurrentView] = useState<ViewType>('inbox');
  const emails: EmailsType = MOCKED_EMAILS;

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

  const renderContent = () => {
    switch (currentView) {
      case 'inbox':
        return (
          <GenericMailDisplay
            emails={filteredEmails}
            title="Inbox"
            emptyText="Your inbox is empty."
          />
        );
      case 'starred':
        return (
          <GenericMailDisplay
            emails={filteredEmails}
            title="Starred Emails"
            emptyText="No starred emails found."
          />
        );
      case 'all-mail':
        return (
          <GenericMailDisplay
            emails={filteredEmails}
            title="All Mail"
            emptyText="No emails found."
          />
        );
      case 'spam':
        return (
          <GenericMailDisplay
            emails={filteredEmails}
            title="Spam"
            emptyText="No spam emails found."
          />
        );
      case 'trash':
        return (
          <GenericMailDisplay
            emails={filteredEmails}
            title="Trash"
            emptyText="No trashed emails found."
          />
        );
      default:
        return (
          <GenericMailDisplay
            emails={filteredEmails}
            title="Inbox"
            emptyText="Your inbox is empty."
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen grow flex-col bg-[rgb(248,250,253)]">
      <Header />
      <div className="flex grow">
        <SidebarMenu
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default Main;
