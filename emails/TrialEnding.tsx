import {
  Button,
  Heading,
  Section,
  Text,
} from '@react-email/components'
import { BaseLayout } from './BaseLayout'

interface TrialEndingEmailProps {
  name?: string
  appName?: string
  daysRemaining?: number
  trialEndDate?: string
  upgradeUrl?: string
}

export function TrialEndingEmail({
  name = 'there',
  appName = 'SaaS App',
  daysRemaining = 3,
  trialEndDate = 'January 15, 2025',
  upgradeUrl = 'http://localhost:3000/billing',
}: TrialEndingEmailProps) {
  return (
    <BaseLayout
      previewText={`Your trial ends in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`}
      appName={appName}
    >
      <Section className="rounded-xl bg-white p-8 shadow-sm">
        <Heading className="m-0 mb-4 text-xl font-semibold text-zinc-900">
          Your trial ends soon
        </Heading>

        <Text className="mb-6 text-sm leading-6 text-zinc-600">
          Hi {name}, your {appName} trial ends in{' '}
          <strong>
            {daysRemaining} day{daysRemaining === 1 ? '' : 's'}
          </strong>{' '}
          on {trialEndDate}.
        </Text>

        <Section className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-5">
          <Text className="m-0 text-sm leading-6 text-amber-900">
            Upgrade now to keep access to all features. Your data will remain
            intact.
          </Text>
        </Section>

        <Button
          href={upgradeUrl}
          className="rounded-lg bg-zinc-900 px-6 py-3 text-center text-sm font-medium text-white"
        >
          Upgrade Now
        </Button>

        <Text className="mt-6 text-sm leading-6 text-zinc-600">
          Not ready? No problem. Your account will switch to the free tier. You
          can upgrade anytime.
        </Text>

        <Text className="mt-8 text-xs text-zinc-400">
          Questions? Reply to this email.
        </Text>
      </Section>
    </BaseLayout>
  )
}

export default TrialEndingEmail
