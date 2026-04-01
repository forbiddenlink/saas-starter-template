import { render } from '@react-email/components'
import { Resend } from 'resend'
import { WelcomeEmail } from '../../emails/Welcome'
import { PasswordResetEmail } from '../../emails/PasswordReset'
import { SubscriptionConfirmEmail } from '../../emails/SubscriptionConfirm'
import { PaymentReceiptEmail } from '../../emails/PaymentReceipt'
import { TrialEndingEmail } from '../../emails/TrialEnding'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@example.com'
const FROM_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'SaaS App'
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

interface SendEmailResult {
  success: boolean
  error?: string
}

/**
 * Send an email via Resend with React Email template
 */
async function sendEmail(
  to: string,
  subject: string,
  react: React.ReactElement
): Promise<SendEmailResult> {
  if (!resend) {
    console.warn('[Email] Resend not configured - skipping email send')
    return { success: true }
  }

  try {
    const { error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject,
      react,
    })

    if (error) {
      console.error('[Email] Failed to send:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('[Email] Error sending email:', err)
    return { success: false, error: 'Failed to send email' }
  }
}

/**
 * Send welcome email after signup
 */
export async function sendWelcomeEmail(
  to: string,
  name?: string
): Promise<SendEmailResult> {
  return sendEmail(
    to,
    `Welcome to ${FROM_NAME}!`,
    WelcomeEmail({
      name,
      appName: FROM_NAME,
      dashboardUrl: `${BASE_URL}/dashboard`,
    })
  )
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  to: string,
  resetToken: string
): Promise<SendEmailResult> {
  return sendEmail(
    to,
    'Reset your password',
    PasswordResetEmail({
      appName: FROM_NAME,
      resetUrl: `${BASE_URL}/reset-password?token=${resetToken}`,
      expiresIn: '1 hour',
    })
  )
}

/**
 * Send subscription confirmation email
 */
export async function sendSubscriptionConfirmEmail(
  to: string,
  opts: { name?: string; planName: string; billingCycle: string; amount: string }
): Promise<SendEmailResult> {
  return sendEmail(
    to,
    `Your ${opts.planName} subscription is now active`,
    SubscriptionConfirmEmail({
      name: opts.name,
      appName: FROM_NAME,
      planName: opts.planName,
      billingCycle: opts.billingCycle,
      amount: opts.amount,
      dashboardUrl: `${BASE_URL}/dashboard`,
    })
  )
}

/**
 * Send payment receipt email
 */
export async function sendPaymentReceiptEmail(
  to: string,
  opts: {
    name?: string
    invoiceNumber: string
    date: string
    amount: string
    planName: string
    billingPeriod: string
  }
): Promise<SendEmailResult> {
  return sendEmail(
    to,
    `Payment receipt for ${opts.amount}`,
    PaymentReceiptEmail({
      name: opts.name,
      appName: FROM_NAME,
      invoiceNumber: opts.invoiceNumber,
      date: opts.date,
      amount: opts.amount,
      planName: opts.planName,
      billingPeriod: opts.billingPeriod,
      receiptUrl: `${BASE_URL}/billing`,
    })
  )
}

/**
 * Send trial ending reminder email
 */
export async function sendTrialEndingEmail(
  to: string,
  opts: { name?: string; daysRemaining: number; trialEndDate: string }
): Promise<SendEmailResult> {
  return sendEmail(
    to,
    `Your trial ends in ${opts.daysRemaining} day${opts.daysRemaining === 1 ? '' : 's'}`,
    TrialEndingEmail({
      name: opts.name,
      appName: FROM_NAME,
      daysRemaining: opts.daysRemaining,
      trialEndDate: opts.trialEndDate,
      upgradeUrl: `${BASE_URL}/billing`,
    })
  )
}

/**
 * Render email template to HTML (for preview)
 */
export async function renderEmailToHtml(
  template: 'welcome' | 'password-reset' | 'subscription-confirm' | 'payment-receipt' | 'trial-ending',
  props: Record<string, unknown> = {}
): Promise<string> {
  const templates = {
    'welcome': WelcomeEmail,
    'password-reset': PasswordResetEmail,
    'subscription-confirm': SubscriptionConfirmEmail,
    'payment-receipt': PaymentReceiptEmail,
    'trial-ending': TrialEndingEmail,
  }

  const Template = templates[template]
  return render(Template(props as never))
}
