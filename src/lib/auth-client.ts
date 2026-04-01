import { createAuthClient } from "better-auth/react";
import { organizationClient, twoFactorClient } from "better-auth/client/plugins";
import { passkeyClient } from "@better-auth/passkey/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    organizationClient(),
    twoFactorClient({
      onTwoFactorRedirect: () => {
        // Redirect to 2FA verification page on sign-in
        window.location.href = "/auth/two-factor";
      },
    }),
    passkeyClient(),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  // Organization methods
  organization,
  // 2FA methods
  twoFactor,
  // Passkey methods
  passkey,
} = authClient;
