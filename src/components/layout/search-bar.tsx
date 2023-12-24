import { component$, useSignal } from "@builder.io/qwik";
import { SearchIcon } from "../icons";

export const SearchBar = component$(() => {
  const isOpen = useSignal(false);

  return (
    <button
      type="button"
      class="flex items-center h-[42px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 px-3 font-semibold rounded-xl cursor-pointer group transition-colors ease-in-out duration-300"
      onClick$={() => {
        isOpen.value = true;
      }}
    >
      <SearchIcon class="flex-shrink-0 w-[18px] h-[18px] ml-px fill-zinc-400" />
      <span class="w-full ml-2 text-zinc-400 leading-4 text-left">검색</span>
      <span class="border border-zinc-700 group-hover:border-zinc-600 rounded-md px-1.5 py-1 font-semibold text-zinc-400 leading-[12px] text-xs transition-colors ease-in-out duration-300">
        ⌘K
      </span>
    </button>
  );
});
