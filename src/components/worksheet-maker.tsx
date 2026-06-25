'use client'

import { useMemo, useState } from 'react'
import { generateWorksheet } from '@/lib/generator'
import { units } from '@/lib/units'
import { Difficulty, RequestData, Subject, Volume, Worksheet } from '@/lib/types'

const purposes = ['復習', '苦手克服', '先取り', 'お盆休みの宿題', '計算練習', '漢字・語彙練習', '読解練習']

function Choice<T extends string>({
  items,
  value,
  onChange,
}: {
  items: T[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="choices">
      {items.map((item) => (
        <button
          type="button"
          onClick={() => onChange(item)}
          className={`choice ${value === item ? 'selected' : ''}`}
          key={item}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export function WorksheetMaker() {
  const [grade, setGrade] = useState(4)
  const [subject, setSubject] = useState<Subject>('算数')
  const [difficulty, setDifficulty] = useState<Difficulty>('標準')
  const [volume, setVolume] = useState<Volume>('ふつう')
  const [purpose, setPurpose] = useState('復習')
  const [selected, setSelected] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null)
  const [error, setError] = useState('')

  const currentUnits = useMemo(
    () => units.filter((unit) => unit.grade === grade && unit.subject === subject),
    [grade, subject],
  )
  const canAdvance = purpose === '先取り'

  function changeGrade(value: number) {
    setGrade(value)
    setSelected([])
    setWorksheet(null)
  }

  function changeSubject(value: Subject) {
    setSubject(value)
    setSelected([])
    setWorksheet(null)
  }

  function toggleUnit(name: string, allowed: boolean) {
    if (!allowed) return
    setSelected((current) => (current.includes(name) ? current.filter((item) => item !== name) : [...current, name]))
  }

  function create() {
    if (!selected.length) {
      setError('単元を1つ以上選んでください。')
      return
    }

    setError('')
    const request: RequestData = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      grade,
      subject,
      difficulty,
      volume,
      purpose,
      selectedUnits: selected,
      notes,
    }
    const made = generateWorksheet(request)
    setWorksheet(made)

    const existing = JSON.parse(localStorage.getItem('obon-requests') || '[]')
    localStorage.setItem('obon-requests', JSON.stringify([{ ...request, status: 'generated', worksheet: made }, ...existing]))
    setTimeout(() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <>
      <header className="topbar">
        <div className="topinner">
          <a className="brand" href="/">
            お盆休み 宿題プリントメーカー
          </a>
          <a className="navlink" href="/admin/login">
            管理ログイン
          </a>
        </div>
      </header>

      <main className="shell">
        <section className="hero">
          <div className="eyebrow">小学生の家庭学習を、もっと気軽に</div>
          <h1>
            その子に合った
            <br />
            お盆休みプリントをつくる
          </h1>
          <p>
            学年・教科・単元を選ぶだけ。保護者さまに渡しやすい、印刷してすぐ使える宿題プリントを作成します。
          </p>
        </section>

        <section className="card">
          <div className="steps">
            <span className="step active">1. 条件を選ぶ</span>
            <span className="step">2. プリント確認</span>
            <span className="step">3. 印刷・PDF保存</span>
          </div>

          <div className="section">
            <h2>学年と教科</h2>
            <p className="hint">お子さまの学年と、取り組みたい教科を選んでください。</p>
            <div className="grid">
              <div>
                <label className="label">学年</label>
                <select className="field" value={grade} onChange={(event) => changeGrade(Number(event.target.value))}>
                  {[1, 2, 3, 4, 5, 6].map((value) => (
                    <option key={value} value={value}>
                      小学{value}年
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">教科</label>
                <Choice items={['算数', '国語'] as Subject[]} value={subject} onChange={changeSubject} />
              </div>
            </div>
          </div>

          <div className="section">
            <h2>学習の希望</h2>
            <p className="hint">むずかしさ・量・目的を選んでください。</p>
            <div className="grid">
              <div>
                <label className="label">難易度</label>
                <Choice
                  items={['やさしい', '標準', 'チャレンジ'] as Difficulty[]}
                  value={difficulty}
                  onChange={setDifficulty}
                />
              </div>
              <div>
                <label className="label">量</label>
                <Choice items={['少なめ', 'ふつう', 'たっぷり'] as Volume[]} value={volume} onChange={setVolume} />
              </div>
            </div>
            <div className="purposeBlock">
              <label className="label">目的</label>
              <Choice items={purposes} value={purpose} onChange={setPurpose} />
            </div>
          </div>

          <div className="section">
            <h2>
              単元を選ぶ <span className="subText">複数選択できます</span>
            </h2>
            <p className="hint">
              通常はお盆前までの学習範囲を表示しています。
              {canAdvance
                ? '「先取り」を選択中のため、9月以降の単元も選べます。'
                : '「先取り」を選ぶと、9月以降の内容も選択できます。'}
            </p>
            <div className="choices">
              {currentUnits.map((unit) => {
                const allowed = unit.availableByObon || canAdvance
                return (
                  <button
                    type="button"
                    className={`choice unit ${selected.includes(unit.name) ? 'selected' : ''} ${!allowed ? 'locked' : ''}`}
                    onClick={() => toggleUnit(unit.name, allowed)}
                    key={unit.id}
                  >
                    <b>{selected.includes(unit.name) ? '✓ ' : ''}{unit.name}</b>
                    <small>{allowed ? unit.description : '9月以降の単元です。先取りを選ぶと選択できます。'}</small>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="section">
            <label className="label">備考（任意）</label>
            <textarea
              className="field"
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="例：計算ミスが多い、短時間で終わる量がよい"
            />
            <p className="footerNote">個人情報保護のため、生徒名・電話番号・住所・学校名などは入力しないでください。</p>
          </div>

          {error && <p className="error">{error}</p>}
          <button className="primary" onClick={create}>
            プリントを作成する →
          </button>
        </section>

        {worksheet && <Preview worksheet={worksheet} grade={grade} subject={subject} onBack={() => setWorksheet(null)} />}
      </main>
    </>
  )
}

function Preview({
  worksheet,
  grade,
  subject,
  onBack,
}: {
  worksheet: Worksheet
  grade: number
  subject: Subject
  onBack: () => void
}) {
  return (
    <section id="preview">
      <div className="previewHead noPrint">
        <div>
          <div className="eyebrow">プレビュー</div>
          <h1>プリントができました</h1>
          <p className="hint">内容を確認したら、印刷画面から「PDFに保存」を選べます。</p>
        </div>
        <div className="actions">
          <button className="secondary" onClick={onBack}>
            条件を変更
          </button>
          <button className="primary" onClick={() => window.print()}>
            印刷 / PDF保存
          </button>
        </div>
      </div>

      <article className="paper worksheetPaper">
        <div className="paperRibbon">お盆休み がんばりミッション</div>
        <div className="paperTitle">
          <span className="paperBadge">小{grade}・{subject}</span>
          <h2>{worksheet.title}</h2>
          <p>{worksheet.summary}</p>
        </div>

        <div className="studentBar">
          <span>なまえ：</span>
          <span className="writeLine" />
          <span>日にち：</span>
          <span className="dateBoxes">　月　日</span>
        </div>

        <div className="missionBox">
          <strong>⭐ {worksheet.mission}</strong>
          <span>ていねいに書けたら、右上のチェックに色をぬろう。</span>
        </div>

        {worksheet.passage && (
          <section className="passageBox">
            <h3>文章を読んで答えましょう</h3>
            <p>{worksheet.passage}</p>
          </section>
        )}

        <div className="problemList">
          {worksheet.problems.map((problem, index) => (
            <div className="problemCard" key={`${problem.question}-${index}`}>
              <div className="problemTop">
                <b>もんだい {index + 1}</b>
                <span className="checkStar">☆</span>
              </div>
              <p>{problem.question}</p>
              <div className="answerArea">
                <span>答え</span>
              </div>
            </div>
          ))}
        </div>

        <div className="encourageBox">
          <span>できた数：</span>
          <span className="miniLine" /> / {worksheet.problems.length}問
          <span>　今日の気分：</span>
          <span className="emoji">😊 😐 😵</span>
        </div>

        <div className="answerPage">
          <div className="answerHeader">
            <span className="paperBadge">先生・保護者用</span>
            <h2>答え</h2>
          </div>
          {worksheet.problems.map((problem, index) => (
            <div className="answerCard" key={`${problem.answer}-${index}`}>
              <b>{index + 1}.</b> {problem.answer}
              {problem.explanation && <small>{problem.explanation}</small>}
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
