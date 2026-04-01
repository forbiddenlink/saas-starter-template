import {
  Button,
  Heading,
  Hr,
  Section,
  Text,
} from '@react-email/components'
import { BaseLayout } from './BaseLayout'

interface PaymentReceiptEmailProps {
  name?: string
  appName?: string
  invoiceNumber?: string
  date?: string
  amount?: string
  planName?: string
  billingPeriod?: string
  receiptUrl?: string
}

export function PaymentReceiptEmail({
  name = 'there',
  appName = 'SaaS App',
  invoiceNumber = 'INV-0001',
  date = 'January 1, 2025',
  amount = '$29.00',
  planName = 'Pro',
  billingPeriod = 'Jan 1 - Feb 1, 2025',
  receiptUrl = 'http://localhost:3000/billing',
}: PaymentReceiptEmailProps) {
  return (
    <BaseLayout previewText={`Payment receipt for ${amount}`} appName={appName}>
      <Section className="rounded-xl bg-white p-8 shadow-sm">
        <Heading className="m-0 mb-4 text-xl font-semibold text-zinc-900">
          Payment Receipt
        </Heading>

        <Text className="mb-6 text-sm leading-6 text-zinc-600">
          Hi {name}, thank you for your payment. Here&apos;s your receipt.
        </Text>

        <Section className="mb-6 rounded-lg border border-zinc-200 p-5">
          <Text className="m-0 mb-1 text-xs text-zinc-500">
            Invoice #{invoiceNumber}
          </Text>
          <Text className="m-0 mb-4 text-xs text-zinc-500">{date}</Text>

          <Hr className="my-4 border-zinc-200" />

          <Text className="m-0 mb-2 text-sm text-zinc-600">
            {planName} Plan ({billingPeriod})
          </Text>

          <Hr className="my-4 border-zinc-200" />

          <Text className="m-0 flex justify-between text-sm font-medium text-zinc-900">
            <span>Total Paid</span>
            <span>{amount}</span>
          </Text>
        </Section>

        <Button
          href={receiptUrl}
          className="rounded-lg bg-zinc-900 px-6 py-3 text-center text-sm font-medium text-white"
        >
          View Receipt
        </Button>

        <Text className="mt-8 text-xs text-zinc-400">
          This is an automated receipt. If you have questions, reply to this
          email.
        </Text>
      </Section>
    </BaseLayout>
  )
}

export default PaymentReceiptEmail
