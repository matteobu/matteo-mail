export const SidebarItem = ({
  iconSrc,
  label,
  count,
  selected = false,
}: {
  iconSrc: string;
  label: string;
  count?: number;
  selected?: boolean;
}) => (
  <div
    className={`flex items-center gap-4 rounded-full px-3 py-2 mt-0 cursor-pointer  ${
      selected
        ? 'bg-[rgb(211,227,253)] font-semibold text-[rgb(32,33,36)]'
        : 'hover:bg-[oklch(0.928_0.006_264.531)]'
    }`}>
    <img
      alt={label}
      width={20}
      height={20}
      className="h-5 w-5 "
      src={iconSrc}
    />
    <span className="flex-1">{label}</span>
    {count !== undefined && (
      <span className="text-xs font-normal">{count}</span>
    )}
  </div>
);
