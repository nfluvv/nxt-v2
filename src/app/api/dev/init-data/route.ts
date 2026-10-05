import { signInitData } from "@/shared/server/telegram/sign-init-data";

export function GET(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not found", { status: 404 });
  }

  const id = Number(new URL(req.url).searchParams.get("id") ?? 1);
  return Response.json({
    initData: signInitData({
      id,
      first_name: "Dev",
      last_name: `#${id}`,
      username: `dev${id}`,
      language_code: "ru",
    }),
  });
}