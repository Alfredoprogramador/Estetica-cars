import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

type PaymentProvider = "stripe" | "mercado_pago" | "pix";

type PaymentPayload = {
  appointmentId: string;
  provider: PaymentProvider;
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

  const payload = (await request.json()) as PaymentPayload;

  if (!payload.appointmentId || !payload.provider) {
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
    .select("id, customer_id, total_price, status")
    .eq("id", payload.appointmentId)
    .single();

  if (!appointment.data) {
    return new Response(JSON.stringify({ error: "Appointment not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (appointment.data.customer_id !== profile.data.id) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (appointment.data.total_price <= 0) {
    return new Response(JSON.stringify({ error: "Appointment has invalid amount" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      provider: payload.provider,
      appointmentId: payload.appointmentId,
      amount: appointment.data.total_price,
      currency: "BRL",
      appointmentStatus: appointment.data.status,
      status: "pending",
      nextAction:
        payload.provider === "pix"
          ? "display_qr_code"
          : "redirect_to_gateway",
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});
