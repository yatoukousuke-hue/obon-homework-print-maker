'use client'

import { useEffect, useState } from 'react'

type Stored = {
  id: string
  createdAt: string
  grade: number
  subject: string
  difficulty: string
  volume: string
  purpose: string
  selectedUnits: string[]
  notes: string
  status: string
  worksheet: {
    title: string
    problems: { question: string; answer: string }[]
  }
}

export default function Admin() {
  const [items, setItems] = useState<Stored[]>([])
  const [ready, setReady] = useState(false)
  const [detail, setDetail] = useState<Stored | null>(null)

  useEffect(() => {
    if (localStorage.getItem('obon-admin') !== 'true') {
      location.href = '/admin/login'
      return
    }
    setItems(JSON.parse(localStorage.getItem('obon-requests') || '[]'))
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <>
      <header className="topbar">
        <div className="topinner">
          <a className="brand" href="/">
            お盆休み 宿題プリントメーカー
          </a>
          <button
            className="secondary"
            onClick={() => {
              localStorage.removeItem('obon-admin')
              location.href = '/'
            }}
          >
            ログアウト
          </button>
        </div>
      </header>

      <main className="shell">
        <div className="adminHeader">
          <div className="eyebrow">管理画面</div>
          <h1 style={{ margin: '6px 0', color: 'var(--navy)' }}>リクエスト一覧</h1>
          <p className="hint">
            MVPではブラウザ内に保存したリクエストを表示します。Supabase接続後は共有データに差し替えできます。
          </p>
        </div>

        <section className="card tableWrap">
          {items.length === 0 ? (
            <div className="empty">まだリクエストがありません。保護者画面からプリントを作成すると、ここに表示されます。</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>作成日時</th>
                  <th>条件</th>
                  <th>単元</th>
                  <th>状態</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{new Date(item.createdAt).toLocaleString('ja-JP')}</td>
                    <td>
                      小{item.grade} / {item.subject}
                      <br />
                      {item.difficulty}・{item.volume}
                    </td>
                    <td>{item.selectedUnits.join('、')}</td>
                    <td>
                      <span className="badge">{item.status === 'generated' ? '生成済み' : item.status}</span>
                    </td>
                    <td>
                      <button className="secondary" onClick={() => setDetail(item)}>
                        詳細
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {detail && (
          <section className="card" style={{ marginTop: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
              <h2 style={{ marginTop: 0 }}>生成内容</h2>
              <button className="secondary" onClick={() => setDetail(null)}>
                閉じる
              </button>
            </div>
            <p className="hint">備考：{detail.notes || 'なし'}</p>
            {detail.worksheet.problems.map((problem, index) => (
              <div className="answerCard" key={`${problem.question}-${index}`}>
                <b>{index + 1}.</b> {problem.question}
                <small>答え：{problem.answer}</small>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  )
}
