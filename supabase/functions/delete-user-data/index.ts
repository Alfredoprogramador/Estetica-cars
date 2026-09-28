import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

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

  const anonymization = await supabase
    .from("users")
    .update({
      name: "Usuário removido",
      public_name: "Cliente removido",
      email: `deleted+${user.id}@example.invalid`,
      phone: null,
      cpf_cnpj: null,
      address: {},
    })
    .eq("auth_id", user.id);

  if (anonymization.error) {
    return new Response(JSON.stringify({ error: "Failed to anonymize profile" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const auditInsert = await supabase.from("audit_logs").insert({
    user_id: profile.data.id,
    action: "data_delete",
    performed_by: "user",
    details: { source: "edge-function", strategy: "anonymization" },
  });

  if (auditInsert.error) {
    return new Response(JSON.stringify({ error: "Failed to write audit log" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
