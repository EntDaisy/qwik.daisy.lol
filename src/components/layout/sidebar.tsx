import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { useSessionUser } from "~/routes/layout";
import {
  BrushIcon,
  CodeIcon,
  CompassIcon,
  type EvaIcon,
  PaperPlaneIcon,
} from "../icons";
import { Logo } from "../common/logo";
import { SearchBar } from "./search-bar";
import { SidebarItem } from "./sidebar-item";
import { Profile } from "./profile";

export interface SidebarItem {
  icon: EvaIcon;
  href: string;
  label: string;
}

const items: SidebarItem[] = [
  { icon: CompassIcon, href: "/", label: "홈" },
  { icon: BrushIcon, href: "/themes", label: "테마" },
  { icon: CodeIcon, href: "/scripts", label: "스크립트" },
  { icon: PaperPlaneIcon, href: "/direct", label: "Direct" },
];

export const Sidebar = component$(() => {
  const loc = useLocation();
  const user = useSessionUser();

  return (
    <section class="flex flex-col bg-zinc-950 h-screen px-3 border-r border-r-zinc-900">
      <div class="h-12" />
      <div class="flex flex-col gap-y-2">
        <a href="/" class="flex gap-x-2 items-center px-2">
          <Logo class="w-8 h-8" />
          <h1 class="font-display font-semibold text-[26px]">Daisy</h1>
        </a>
        <SearchBar />
      </div>
      <div class="mt-3">
        {items.map((item) => (
          <SidebarItem
            {...item}
            selected={item.href === "/"
              ? item.href === loc.url.pathname
              : loc.url.pathname.startsWith(item.href)}
            key={item.href}
          />
        ))}
      </div>
      <div class="mt-auto mb-3">
        <Profile user={user.value} />
      </div>
    </section>
  );
});
