import { betterAuth } from "better-auth";
import { organization, twoFactor } from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";

export const auth = betterAuth({
  appName: process.env.NEXT_PUBLIC_APP_NAME || "SaaS App",
  database: {
    provider: "pg",
    url: process.env.DATABASE_URL!,
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    // Uncomment and configure as needed:
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // },
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  plugins: [
    // Organization/team-based access with roles
    organization({
      allowUserToCreateOrganization: true,
    }),
    // Two-factor authentication with TOTP
    twoFactor({
      issuer: process.env.NEXT_PUBLIC_APP_NAME || "SaaS App",
      skipVerificationOnEnable: false,
    }),
    // Passkey/WebAuthn for passwordless authentication
    passkey({
      rpID: process.env.NEXT_PUBLIC_PASSKEY_RP_ID || "localhost",
      rpName: process.env.NEXT_PUBLIC_APP_NAME || "SaaS App",
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type Organization = typeof auth.$Infer.Organization;
export type Member = typeof auth.$Infer.Member;
