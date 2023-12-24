import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { twJoin, twMerge } from "tailwind-merge";
import type { EvaIcon } from "../icons";

interface InputProps extends Omit<QwikIntrinsicElements["input"], "children"> {
  icon?: EvaIcon;
  shortcut?: string;
  onShortcutClick?: () => Promise<void> | void;
}

export const Input = ({
  icon: Icon,
  shortcut,
  onShortcutClick,
  ...props
}: InputProps) => {
  return (
    <label
      class={twMerge(
        "flex items-center h-[42px] px-3 font-semibold bg-zinc-900 border border-zinc-800 rounded-xl cursor-pointer",
      )}
    >
      {Icon && (
        <Icon class="flex-shrink-0 w-[18px] h-[18px] ml-px fill-zinc-400" />
      )}
      {/* @ts-expect-error */}
      <input
        {...props}
        class={twJoin(
          "bg-transparent w-full placeholder:text-zinc-400 leading-4 focus:outline-none",
          Icon && "ml-2",
        )}
      />
      {shortcut && (
        <span
          class="px-1.5 py-1 font-semibold text-zinc-400 text-xs leading-[12px] border border-zinc-700 rounded-md"
          onClick$={onShortcutClick}
        >
          {shortcut}
        </span>
      )}
    </label>
  );
};
