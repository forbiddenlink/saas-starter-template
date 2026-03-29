import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Rate limit: 10 requests per minute
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "anonymous";
  const { success, response } = await rateLimit(ip, 10, "60 s");
  if (!success && response) return response;

  try {
    const { priceId, successUrl, cancelUrl } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
