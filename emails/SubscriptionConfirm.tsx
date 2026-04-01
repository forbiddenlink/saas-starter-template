import {
  Button,
  Heading,
  Section,
  Text,
} from '@react-email/components'
import { BaseLayout } from './BaseLayout'

interface SubscriptionConfirmEmailProps {
  name?: string
  appName?: string
  planName?: string
  billingCycle?: string
  amount?: string
  dashboardUrl?: string
}

export function SubscriptionConfirmEmail({
  name = 'there',
  appName = 'SaaS App',
  planName = 'Pro',
  billingCycle = 'monthly',
  amount = '$29',
  dashboardUrl = 'http://localhost:3000/dashboard',
}: SubscriptionConfirmEmailProps) {
  return (
    <BaseLayout
      previewText={`Your ${planName} subscription is now active`}
      appName={appName}
    >
      <Section className="rounded-xl bg-white p-8 shadow-sm">
        <Heading className="m-0 mb-4 text-xl font-semibold text-zinc-900">
          Subscription Confirmed
        </Heading>

        <Text className="mb-6 text-sm leading-6 text-zinc-600">
          Hi {name}, thank you for subscribing! Your {planName} plan is now
          active.
        </Text>

        <Section className="mb-6 rounded-lg border border-zinc-200 p-5">
          <Text className="m-0 mb-2 text-sm font-medium text-zinc-900">
            Subscription Details
          </Text>
          <Text className="m-0 text-sm text-zinc-600">
            Plan: <strong>{planName}</strong>
            <br />
            Billing: <strong>{billingCycle}</strong>
            <br />
            Amount: <strong>{amount}</strong>
          </Text>
        </Section>

        <Text className="mb-6 text-sm leading-6 text-zinc-600">
          You now have full access to all {planName} features.
        </Text>

        <Button
          href={dashboardUrl}
          className="rounded-lg bg-zinc-900 px-6 py-3 text-center text-sm font-medium text-white"
        >
          Go to Dashboard
        </Button>

        <Text className="mt-8 text-xs text-zinc-400">
          Questions about your subscription? Reply to this email.
        </Text>
      </Section>
    </BaseLayout>
  )
}

export default SubscriptionConfirmEmail
