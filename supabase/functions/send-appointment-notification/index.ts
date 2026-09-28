import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

type NotificationPayload = {
  appointmentId: string;
  userId: string;
  title: string;
  body: string;
  type?: "appointment" | "payment" | "system";
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const authorization = request.headers.get("Authorization");
  if (!authorization) {
    return new Response(JSON.stringify({ error: "Missing authorization header" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const payload = (await request.json()) as NotificationPayload;

  if (!payload.appointmentId || !payload.userId || !payload.title || !payload.body) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      global: {
        headers: { Authorization: authorization },
      },
    },
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const profile = await supabase.from("users").select("id").eq("auth_id", user.id).single();

  if (!profile.data) {
    return new Response(JSON.stringify({ error: "Profile not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const appointment = await supabase
    .from("appointments")
    .select("customer_id, professional_id")
    .eq("id", payload.appointmentId)
    .single();

  if (!appointment.data) {
    return new Response(JSON.stringify({ error: "Appointment not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let allowedRecipientId: string | null = null;

  if (appointment.data.customer_id === profile.data.id) {
    const professional = await supabase
      .from("professional_profiles")
      .select("user_id")
      .eq("id", appointment.data.professional_id)
      .single();

    allowedRecipientId = professional.data?.user_id ?? null;
  } else {
    const professional = await supabase
      .from("professional_profiles")
      .select("id")
      .eq("user_id", profile.data.id)
      .single();

    if (professional.data?.id === appointment.data.professional_id) {
      allowedRecipientId = appointment.data.customer_id;
    }
  }

  if (!allowedRecipientId || payload.userId !== allowedRecipientId) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  await supabase.from("notifications").insert({
    user_id: payload.userId,
    title: payload.title,
    body: payload.body,
    type: payload.type ?? "appointment",
  });

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
