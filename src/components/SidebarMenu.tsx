import { SidebarItem } from './SidebarItem';

const SidebarMenu = () => (
  <div className="w-[256px] shrink-0 px-3 py-4 text-sm">
    <div className="mb-4 h-[56px] w-[138px] rounded-2xl bg-[rgb(194,231,255)] opacity-50" />

    <SidebarItem
      iconSrc="/icons/icon-inbox.png"
      label="Inbox"
      count={5}
      selected
    />
    <SidebarItem
      iconSrc="/icons/icon-star.png"
      label="Starred"
    />
    <SidebarItem
      iconSrc="/icons/icon-all-mail.png"
      label="All Mail"
    />
    <SidebarItem
      iconSrc="/icons/icon-spam.png"
      label="Spam"
      count={1}
    />
    <SidebarItem
      iconSrc="/icons/icon-trash.png"
      label="Trash"
    />
  </div>
);

export default SidebarMenu;
