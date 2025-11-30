import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lineage 2 Craft Calculator',
  description: 'Calculate crafting costs for Lineage 2 items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


