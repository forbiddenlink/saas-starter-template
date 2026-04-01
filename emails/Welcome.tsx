import {
  Button,
  Heading,
  Section,
  Text,
} from '@react-email/components'
import { BaseLayout } from './BaseLayout'

interface WelcomeEmailProps {
  name?: string
  appName?: string
  dashboardUrl?: string
}

export function WelcomeEmail({
  name = 'there',
  appName = 'SaaS App',
  dashboardUrl = 'http://localhost:3000/dashboard',
}: WelcomeEmailProps) {
  return (
    <BaseLayout previewText={`Welcome to ${appName}`} appName={appName}>
      <Section className="rounded-xl bg-white p-8 shadow-sm">
        <Heading className="m-0 mb-4 text-xl font-semibold text-zinc-900">
          Welcome to {appName}!
        </Heading>

        <Text className="mb-6 text-sm leading-6 text-zinc-600">
          Hi {name}, your account has been created successfully. You&apos;re
          ready to get started.
        </Text>

        <Section className="mb-6 rounded-lg border border-zinc-200 p-5">
          <Text className="m-0 text-sm leading-6 text-zinc-900">
            <strong>What&apos;s next?</strong>
            <br />
            <br />
            Explore your dashboard, configure your settings, and start using all
            the features available to you.
          </Text>
        </Section>

        <Button
          href={dashboardUrl}
          className="rounded-lg bg-zinc-900 px-6 py-3 text-center text-sm font-medium text-white"
        >
          Go to Dashboard
        </Button>

        <Text className="mt-8 text-xs text-zinc-400">
          You&apos;re receiving this because you signed up for {appName}.
        </Text>
      </Section>
    </BaseLayout>
  )
}

export default WelcomeEmail
