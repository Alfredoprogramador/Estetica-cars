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

  const adminSupabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
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

  const profileResult = await supabase
    .from("users")
    .select("id, role, name, public_name, email, phone, address, created_at, updated_at")
    .eq("auth_id", user.id)
    .single();

  if (profileResult.error) {
    return new Response(JSON.stringify({ error: "Failed to load profile" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!profileResult.data) {
    return new Response(JSON.stringify({ error: "Profile not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const professionalProfile = await supabase
    .from("professional_profiles")
    .select("id, bio, service_radius_km, average_rating, total_reviews, is_verified, created_at")
    .eq("user_id", profileResult.data.id)
    .maybeSingle();

  const [profile, cars, appointments, payments, reviews, professionalAppointments, professionalReviews] = await Promise.all([
    Promise.resolve(profileResult),
    supabase.from("cars").select("*").eq("user_id", profileResult.data.id),
    supabase.from("appointments").select("*").eq("customer_id", profileResult.data.id),
    supabase.from("payments").select("*").eq("customer_id", profileResult.data.id),
    supabase.from("reviews").select("*").eq("customer_id", profileResult.data.id),
    professionalProfile.data
      ? supabase.from("appointments").select("*").eq("professional_id", professionalProfile.data.id)
      : Promise.resolve({ data: [], error: null }),
    professionalProfile.data
      ? supabase.from("reviews").select("*").eq("professional_id", professionalProfile.data.id)
      : Promise.resolve({ data: [], error: null }),
  ]);

  const auditInsert = await adminSupabase.from("audit_logs").insert({
    user_id: profile.data.id,
    action: "data_export",
    performed_by: "user",
    details: { source: "edge-function" },
  });

  if (auditInsert.error) {
    return new Response(JSON.stringify({ error: "Failed to write audit log" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      profile: profile.data,
      cars: cars.data ?? [],
      appointments: appointments.data ?? [],
      payments: payments.data ?? [],
      reviews: reviews.data ?? [],
      professionalProfile: professionalProfile.data,
      professionalAppointments: professionalAppointments.data ?? [],
      professionalReviews: professionalReviews.data ?? [],
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});
