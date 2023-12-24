import { Link } from "@builder.io/qwik-city";
import { twMerge } from "tailwind-merge";
import type { SidebarItem as ISidebarItem } from "./sidebar";

interface SidebarItemProps extends ISidebarItem {
  selected: boolean;
}

export const SidebarItem = ({
  icon: Icon,
  href,
  label,
  selected,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      class={twMerge(
        "flex items-center h-[42px] bg-transparent hover:bg-zinc-900 border border-transparent hover:border-zinc-800 px-3 font-semibold rounded-xl cursor-pointer group transition-colors duration-300 ease-in-out",
        selected &&
          "bg-brand-dark-50 hover:bg-brand-dark-100 border-brand-dark-100 hover:border-brand-dark-200",
      )}
    >
      <Icon
        class={twMerge(
          "flex-shrink-0 w-[18px] h-[18px] ml-px fill-zinc-500 transition-colors duration-300 ease-in-out",
          selected && "fill-brand-300",
        )}
      />
      <span
        class={twMerge(
          "bg-transparent w-full ml-2 text-zinc-500 leading-4 focus:outline-none transition-colors duration-300 ease-in-out",
          selected && "text-brand-300",
        )}
      >
        {label}
      </span>
    </Link>
  );
};
