import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Rate limit: 5 requests per minute
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "anonymous";
  const { success, response } = await rateLimit(ip, 5, "60 s");
  if (!success && response) return response;

  try {
    const { customerId, returnUrl } = await request.json();

    if (!customerId) {
      return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
    }

    const stripe = getStripe();

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Portal error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
