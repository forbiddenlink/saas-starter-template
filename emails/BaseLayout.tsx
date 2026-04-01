import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'
import type { ReactNode } from 'react'

interface BaseLayoutProps {
  previewText: string
  children: ReactNode
  appName?: string
}

export function BaseLayout({
  previewText,
  children,
  appName = 'SaaS App',
}: BaseLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-zinc-50 font-sans">
          <Container className="mx-auto max-w-[480px] py-8">
            {children}
            <Section className="mt-8 text-center">
              <Text className="text-xs text-zinc-400">{appName}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
