import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { User } from "lucia";
import { type EvaIcon, LoginIcon, LogoutIcon, PersonIcon } from "../icons";

interface ProfileProps {
  user: User | null;
}

interface ProfileItem {
  icon: EvaIcon;
  href: string;
  label: string;
}

export const Profile = component$(({ user }: ProfileProps) => {
  const dialogRef = useSignal<HTMLDialogElement>();

  useOnDocument(
    "click",
    $((e) => {
      if (
        e.target instanceof Node &&
        dialogRef.value &&
        !dialogRef.value.contains(e.target)
      ) {
        dialogRef.value.close();
      }
    }),
  );

  const items: ProfileItem[] = [
    { icon: PersonIcon, href: `/user/${""}`, label: "내 프로필" },
    { icon: LogoutIcon, href: "/logout", label: "로그아웃" },
  ];

  if (!user) {
    return (
      <Link
        href="/login"
        class="flex items-center gap-x-2 hover:bg-zinc-900 px-3 py-2.5 border border-transparent hover:border-zinc-800 rounded-xl cursor-pointer transition-colors duration-300 ease-in-out"
      >
        <div class="flex items-center justify-center h-10">
          <LoginIcon class="fill-zinc-400 w-6 h-w-6" />
          <span class="font-semibold text-zinc-400 text-lg leading-4 ml-2">
            로그인
          </span>
        </div>
      </Link>
    );
  }

  return (
    <>
      <div class="relative">
        <dialog
          ref={dialogRef}
          class="block absolute bottom-1 bg-transparent opacity-0 scale-95 open:opacity-100 open:scale-100 m-0 p-0 border-none transition-[opacity_transform] ease-in-out duration-300"
        >
          <ul class="bg-zinc-950 border border-zinc-900 w-[231px] p-1.5 transition-colors duration-300 ease-in-out shadow-md rounded-2xl">
            {items.map((item) => {
              const linkChild = (
                <>
                  <item.icon class="flex-shrink-0 w-[18px] h-[18px] ml-px fill-zinc-400" />
                  <span class="bg-transparent w-full ml-2 text-zinc-400 leading-4 focus:outline-none">
                    {item.label}
                  </span>
                </>
              );

              return (
                <li>
                  {item.href !== "/logout"
                    ? (
                      <Link
                        href={item.href}
                        class="flex items-center h-[42px] bg-transparent hover:bg-zinc-900 border border-transparent hover:border-zinc-800 px-3 font-semibold rounded-xl cursor-pointer group transition-colors duration-300 ease-in-out"
                      >
                        {linkChild}
                      </Link>
                    )
                    : (
                      <a
                        href={item.href}
                        class="flex items-center h-[42px] bg-transparent hover:bg-zinc-900 border border-transparent hover:border-zinc-800 px-3 font-semibold rounded-xl cursor-pointer group transition-colors duration-300 ease-in-out"
                      >
                        {linkChild}
                      </a>
                    )}
                </li>
              );
            })}
          </ul>
        </dialog>
      </div>
      <button
        type="button"
        class="flex items-center gap-x-2 hover:bg-zinc-900 w-full min-w-0 px-3 py-2.5 border border-transparent hover:border-zinc-800 text-start rounded-xl cursor-pointer focus:outline-none transition-colors duration-300 ease-in-out"
        onClick$={() => dialogRef.value?.show()}
      >
        <div class="flex flex-shrink-0 items-center justify-center bg-zinc-950 w-10 h-10 border border-zinc-800 rounded-full overflow-clip transition-colors duration-300 ease-in-out">
          <img
            src={user.profileImage ??
              "https://playentry.org/img/DefaultCardUserThmb.svg"}
            width="40"
            height="40"
            alt={user.username
              ? `${user.username}의 프로필 사진`
              : "프로필 사진"}
          />
        </div>
        <div class="flex flex-col mt-1 overflow-hidden">
          <span class="font-medium text-zinc-100 text-lg text-ellipsis leading-4 overflow-clip transition-colors duration-300 ease-in-out">
            {user.username}
          </span>
          <span class="text-zinc-400 text-[15px] text-ellipsis leading-4 mt-px overflow-clip transition-colors duration-300 ease-in-out">
            {user.entryId}
          </span>
        </div>
      </button>
    </>
  );
});
