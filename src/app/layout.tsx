import type { Metadata } from 'next'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import './globals.css'

const rounded = M_PLUS_Rounded_1c({
  weight: ['400', '500', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-rounded',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'お盆休み 宿題プリントメーカー',
  description: '小学生向けの家庭学習プリントを日別に作成できます。',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={rounded.variable}>
      <body>{children}</body>
    </html>
  )
}
