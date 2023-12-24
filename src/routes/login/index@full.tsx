import { component$, useComputed$ } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  useLocation,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { Argon2id } from "oslo/password";
import { Input } from "~/components/common/input";
import { Logo } from "~/components/common/logo";
import {
  PASSWORD_REQUIREMENTS,
  USERNAME_REQUIREMENTS,
} from "~/utils/credentials-requirements";
import { db } from "~/utils/drizzle";
import { lucia } from "~/utils/lucia";

interface LoginProps {
  username: string;
  password: string;
  redirect?: string;
}

const loginSchema = z.object({
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
});

export const useLogin = routeAction$(async (data, e) => {
  const { username, password, redirect } = data as unknown as LoginProps;

  try {
    const user = await db.query.userTable.findFirst({
      where: (user, { eq }) => eq(user.username, username),
      with: {
        sessions: true,
        storeItems: true,
        messages: true,
      },
    });
    if (!user) return { success: false, message: "존재하지 않는 계정이에요." };

    const passwordValid = await new Argon2id().verify(user.password, password);
    if (!passwordValid) {
      return {
        success: false,
        message: "아이디 또는 비밀번호가 일치하지 않아요.",
      };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    e.cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    e.redirect(302, redirect ?? "/");
  } catch (err) {}
}, zod$(loginSchema));

export default component$(() => {
  const action = useLogin();

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
          {action.value &&
            action.value.success !== undefined &&
            !action.value.success && (
            <div class="font-medium bg-red-950/70 text-red-500 w-full mt-3 px-3.5 py-2.5 border border-red-950 rounded-xl">
              {action.value.message ?? "알 수 없는 오류가 발생했어요."}
            </div>
          )}
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
          {redirect.value && (
            <input name="redirect" type="hidden" value={redirect.value} />
          )}
          <button
            type="submit"
            class="font-display font-bold text-white leading-7 bg-brand-500 hover:bg-brand-400 w-full h-max mt-4 px-[18px] py-2 my-auto rounded-xl cursor-pointer shadow-sm transition-colors duration-300 ease-in-out"
          >
            로그인
          </button>
          <div class="flex w-full font-medium text-sm mt-2.5 mb-5 sm:mb-4">
            <span class="text-zinc-500">계정이 없으신가요?&nbsp;</span>
            <Link
              href="/join"
              class="text-brand-400 hover:underline cursor-pointer"
            >
              회원가입
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
});
