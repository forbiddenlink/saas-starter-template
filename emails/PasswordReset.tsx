import {
  Button,
  Heading,
  Section,
  Text,
} from '@react-email/components'
import { BaseLayout } from './BaseLayout'

interface PasswordResetEmailProps {
  appName?: string
  resetUrl?: string
  expiresIn?: string
}

export function PasswordResetEmail({
  appName = 'SaaS App',
  resetUrl = 'http://localhost:3000/reset-password?token=xxx',
  expiresIn = '1 hour',
}: PasswordResetEmailProps) {
  return (
    <BaseLayout previewText="Reset your password" appName={appName}>
      <Section className="rounded-xl bg-white p-8 shadow-sm">
        <Heading className="m-0 mb-4 text-xl font-semibold text-zinc-900">
          Reset your password
        </Heading>

        <Text className="mb-6 text-sm leading-6 text-zinc-600">
          We received a request to reset your password. Click the button below
          to create a new password. This link expires in {expiresIn}.
        </Text>

        <Button
          href={resetUrl}
          className="rounded-lg bg-zinc-900 px-6 py-3 text-center text-sm font-medium text-white"
        >
          Reset Password
        </Button>

        <Text className="mt-6 text-sm leading-6 text-zinc-600">
          If you didn&apos;t request this, you can safely ignore this email.
          Your password will remain unchanged.
        </Text>

        <Text className="mt-8 text-xs text-zinc-400">
          This link will expire in {expiresIn} for security reasons.
        </Text>
      </Section>
    </BaseLayout>
  )
}

export default PasswordResetEmail
