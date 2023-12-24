import { component$, useComputed$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  useLocation,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { Input } from "~/components/common/input";
import { Logo } from "~/components/common/logo";
import {
  ENTRY_ID_REQUIREMENTS,
  PASSWORD_REQUIREMENTS,
  USERNAME_REQUIREMENTS,
} from "~/utils/credentials-requirements";
import { db } from "~/utils/drizzle";
import { lucia } from "~/utils/lucia";
import { userTable } from "~/utils/schema";

interface JoinProps {
  username: string;
  password: string;
  entryId: string;
  redirect?: string;
}

const joinSchema = z.object({
  username: z
    .string()
    .min(4, USERNAME_REQUIREMENTS)
    .max(32, USERNAME_REQUIREMENTS)
    .refine((username) => /^[a-z0-9]*$/.test(username), {
      message: USERNAME_REQUIREMENTS,
    }),
  password: z
    .string()
    .min(6, PASSWORD_REQUIREMENTS)
    .max(32, PASSWORD_REQUIREMENTS)
    .refine((username) => /^[a-z0-9]*$/.test(username), {
      message: PASSWORD_REQUIREMENTS,
    }),
  entryId: z
    .string()
    .length(24, ENTRY_ID_REQUIREMENTS)
    .refine((username) => /^[a-z0-9]*$/.test(username), {
      message: ENTRY_ID_REQUIREMENTS,
    }),
});

export const useJoin = routeAction$(async (data, e) => {
  const { username, password, entryId, redirect } =
    data as unknown as JoinProps;

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    await db.insert(userTable).values({
      id: userId,
      username,
      password: hashedPassword,
      entryId,
      createdAt: Date.now(),
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    e.cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    e.redirect(302, redirect ?? "/");
  } catch (err) {
    // if (err instanceof PrismaClientKnownRequestError) {
    //   if (err.code === 'SQLITE_CONSTRAINT' && err.meta?.modelName === 'User') {
    //     return {
    //       success: false,
    //       message: '이미 다른 사람이 사용 중인 아이디에요.',
    //     };
    //   }
    // }
    console.log(err);
  }
}, zod$(joinSchema));

export default component$(() => {
  const action = useJoin();

  const loc = useLocation();
  const redirect = useComputed$(() => loc.url.searchParams.get("redirect"));

  return (
    <div class="bg-[#0000] bg-repeat bg-[0_0] bg-[length:100%_100%] bg-scroll bg-origin-padding bg-clip-border bg-[conic-gradient(from_90deg_at_50%_0,_#ff640080,_#ff640080_0deg,_#82dca080_135deg),_linear-gradient(#ff005a80_0%,_#82dca080_100%,_#82dca080)] [background-blend-mode:_color-dodge] h-screen select-none">
      <div class="flex w-full h-full px-2">
        <Form
          action={action}
          class="flex flex-col items-center bg-zinc-950 text-white w-full h-max max-w-md m-auto px-8 sm:px-6 rounded-3xl sm:rounded-2xl shadow-xl"
        >
          <a href="/" class="flex items-center gap-x-2 px-2 mt-6 sm:mt-5">
            <Logo class="w-[34px] h-[34px]" />
            <h1 class="font-display font-semibold text-white text-[26px] transition-colors duration-300 ease-in-out">
              Daisy
            </h1>
          </a>
          {
            /*
          {action.value &&
            action.value.success !== undefined &&
            !action.value.success && (
              <div class="font-medium bg-red-950/70 text-red-500 w-full mt-3 px-3.5 py-2.5 border border-red-950 rounded-xl">
                {action.value.message ?? '알 수 없는 오류가 발생했어요.'}
              </div>
            )}
          }
          */
          }
          {action.value?.failed &&
            Object.values(action.value.fieldErrors).flatMap((errors) =>
              errors.map((error) => (
                <div class="font-medium bg-red-950/70 text-red-500 w-full mt-3 px-3.5 py-2.5 border border-red-950 rounded-xl">
                  {error}
                </div>
              ))
            )}
          <label class="w-full mt-2">
            <span class="font-medium text-zinc-400 text-sm leading-4 transition-colors duration-300 ease-in-out">
              아이디
            </span>
            <Input
              name="username"
              placeholder="gildong"
              minLength={4}
              maxLength={32}
              autoFocus
              required
            />
          </label>
          <label class="w-full mt-2">
            <span class="font-medium text-zinc-400 text-sm leading-4 transition-colors duration-300 ease-in-out">
              비밀번호
            </span>
            <Input
              name="password"
              type="password"
              placeholder="p@ssw0rd"
              minLength={6}
              maxLength={32}
              autoFocus
              required
            />
          </label>
          <label class="w-full mt-2">
            <span class="font-medium text-zinc-400 text-sm leading-4 transition-colors duration-300 ease-in-out">
              엔트리 계정
            </span>
            <Input
              name="entryId"
              placeholder="선택하지 않음"
              minLength={24}
              maxLength={24}
              autoFocus
              required
            />
          </label>
          {redirect.value && (
            <input name="redirect" type="hidden" value={redirect.value} />
          )}
          <button
            type="submit"
            class="font-display font-bold text-white leading-7 bg-brand-500 hover:bg-brand-400 w-full h-max mt-4 px-[18px] py-2 my-auto rounded-xl cursor-pointer shadow-sm transition-colors duration-300 ease-in-out"
          >
            회원가입
          </button>
          <div class="flex w-full font-medium text-sm mt-2.5 mb-5 sm:mb-4">
            <span class="text-zinc-500">계정이 있으신가요?&nbsp;</span>
            <a
              href="/join"
              class="text-brand-400 hover:underline cursor-pointer"
            >
              로그인
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
});
