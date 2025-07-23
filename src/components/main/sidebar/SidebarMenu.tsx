import type { ViewType } from '../Main';
import { SidebarItem } from './SidebarItem';

interface SidebarMenuProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  counts: {
    unreadNotSpam: number;
    starredUnread: number;
    spamUnread: number;
    trashUnread: number;
  };
}

const SidebarMenu = ({
  currentView,
  onViewChange,
  counts,
}: SidebarMenuProps) => (
  <div className="w-[256px] shrink-0 px-3 py-4 text-sm space-y-2">
    <div className="mb-4 h-[56px] w-[138px] rounded-2xl bg-[rgb(194,231,255)] opacity-50" />

    <SidebarItem
      iconSrc="/icons/icon-inbox.png"
      label="Inbox"
      count={counts.unreadNotSpam}
      selected={currentView === 'inbox'}
      onClick={() => onViewChange('inbox')}
    />
    <SidebarItem
      iconSrc="/icons/icon-star.png"
      label="Starred"
      count={counts.starredUnread}
      selected={currentView === 'starred'}
      onClick={() => onViewChange('starred')}
    />
    <SidebarItem
      iconSrc="/icons/icon-all-mail.png"
      label="All Mail"
      count={counts.unreadNotSpam + counts.starredUnread + counts.spamUnread}
      selected={currentView === 'all-mail'}
      onClick={() => onViewChange('all-mail')}
    />
    <SidebarItem
      iconSrc="/icons/icon-spam.png"
      label="Spam"
      count={counts.spamUnread}
      selected={currentView === 'spam'}
      onClick={() => onViewChange('spam')}
    />
    <SidebarItem
      iconSrc="/icons/icon-trash.png"
      label="Trash"
      count={counts.trashUnread}
      selected={currentView === 'trash'}
      onClick={() => onViewChange('trash')}
    />
  </div>
);

export default SidebarMenu;
