import { corsHeaders } from "../_shared/cors.ts";

type NotificationPayload = {
  userId: string;
  title: string;
  body: string;
  type?: "appointment" | "payment" | "system";
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const payload = (await request.json()) as NotificationPayload;

  if (!payload.userId || !payload.title || !payload.body) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      queued: true,
      userId: payload.userId,
      title: payload.title,
      body: payload.body,
      type: payload.type ?? "appointment",
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});
