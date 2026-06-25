import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'お盆休み 宿題プリントメーカー', description: '小学生向けの家庭学習プリントを作成' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>
}
