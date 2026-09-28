import { corsHeaders } from "../_shared/cors.ts";

type PaymentProvider = "stripe" | "mercado_pago" | "pix";

type PaymentPayload = {
  appointmentId: string;
  amount: number;
  provider: PaymentProvider;
  currency?: string;
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const payload = (await request.json()) as PaymentPayload;

  if (!payload.appointmentId || !payload.provider || payload.amount <= 0) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      provider: payload.provider,
      appointmentId: payload.appointmentId,
      amount: payload.amount,
      currency: payload.currency ?? "BRL",
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
