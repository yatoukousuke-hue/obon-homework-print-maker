import { Problem, ProblemStyle, RequestData, Worksheet } from './types'

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

const questionsPerDay = {
  '10問/日': 10,
  '15問/日': 15,
  '20問/日': 20,
}

function divisionWrittenProblem(difficulty: string): Problem {
  const easy = difficulty === 'やさしい'
  const hard = difficulty === 'チャレンジ'
  const divisor = hard ? randomInt(11, 24) : randomInt(3, 9)
  const quotient = easy ? randomInt(12, 48) : randomInt(23, hard ? 96 : 72)
  const remainder = hard ? randomInt(1, divisor - 1) : randomInt(0, divisor - 1)
  const dividend = divisor * quotient + remainder

  return {
    kind: '筆算',
    workspace: 'vertical',
    question: `${dividend} ÷ ${divisor} を筆算で計算しましょう。${remainder ? 'あまりも書きましょう。' : ''}`,
    answer: remainder ? `${quotient} あまり ${remainder}` : `${quotient}`,
    explanation: `${divisor} × ${quotient}${remainder ? ` + ${remainder}` : ''} = ${dividend}`,
  }
}

function angleProblem(difficulty: string, index: number): Problem {
  const hard = difficulty === 'チャレンジ'
  const base = hard ? randomInt(35, 145) : randomInt(25, 120)
  const second = hard ? randomInt(15, 75) : randomInt(10, 50)

  if (index % 2 === 0) {
    const total = base + second
    return {
      kind: '応用',
      workspace: 'diagram',
      question: `2つの角を合わせると ${total}° です。1つの角が ${base}° のとき、もう1つの角は何度ですか。図にメモして考えましょう。`,
      answer: `${second}°`,
      explanation: `${total} - ${base} = ${second}`,
    }
  }

  return {
    kind: '応用',
    workspace: 'diagram',
    question: `まっすぐな線の角度は180°です。片方の角が ${base}° のとき、となりの角は何度ですか。`,
    answer: `${180 - base}°`,
    explanation: `180 - ${base} = ${180 - base}`,
  }
}

function mathCalculation(unit: string, difficulty: string): Problem {
  const easy = difficulty === 'やさしい'
  const hard = difficulty === 'チャレンジ'

  if (unit.includes('わり算の筆算')) {
    return divisionWrittenProblem(difficulty)
  }

  if (unit.includes('角度')) {
    return angleProblem(difficulty, randomInt(1, 1000))
  }

  if (unit.includes('わり算')) {
    const divisor = randomInt(2, easy ? 5 : 12)
    const quotient = randomInt(2, hard ? 25 : 12)
    const remainder = hard ? randomInt(0, divisor - 1) : 0
    const dividend = divisor * quotient + remainder
    return {
      kind: '計算',
      workspace: 'line',
      question: remainder ? `${dividend} ÷ ${divisor} を計算しましょう。あまりも書きましょう。` : `${dividend} ÷ ${divisor} を計算しましょう。`,
      answer: remainder ? `${quotient} あまり ${remainder}` : `${quotient}`,
      explanation: `${divisor} × ${quotient}${remainder ? ` + ${remainder}` : ''} = ${dividend}`,
    }
  }

  if (unit.includes('かけ算')) {
    const a = randomInt(2, hard ? 24 : 12)
    const b = randomInt(2, hard ? 18 : 12)
    return {
      kind: '計算',
      workspace: 'grid',
      question: `${a} × ${b} を計算しましょう。`,
      answer: `${a * b}`,
      explanation: `${a}を${b}こ分あわせます。`,
    }
  }

  if (unit.includes('分数')) {
    const denominator = randomInt(3, hard ? 12 : 9)
    const a = randomInt(1, denominator - 1)
    const b = randomInt(1, denominator - 1)
    return {
      kind: '計算',
      workspace: 'line',
      question: `${a}/${denominator} + ${b}/${denominator} を計算しましょう。`,
      answer: `${a + b}/${denominator}`,
      explanation: '分母が同じなので、分子どうしをたします。',
    }
  }

  if (unit.includes('小数')) {
    const a = randomInt(12, hard ? 189 : 89) / 10
    const b = randomInt(11, hard ? 149 : 49) / 10
    return {
      kind: '計算',
      workspace: 'grid',
      question: `${a.toFixed(1)} + ${b.toFixed(1)} を計算しましょう。`,
      answer: `${(a + b).toFixed(1)}`,
      explanation: '小数点の位置をそろえて計算します。',
    }
  }

  const a = randomInt(easy ? 1 : 18, hard ? 999 : 160)
  const b = randomInt(easy ? 1 : 9, hard ? 499 : 90)
  const operator = hard && Math.random() > 0.45 ? '-' : '+'
  const left = operator === '-' ? Math.max(a, b) : a
  const right = operator === '-' ? Math.min(a, b) : b
  return {
    kind: '計算',
    workspace: 'grid',
    question: `${left} ${operator} ${right} を計算しましょう。`,
    answer: `${operator === '+' ? left + right : left - right}`,
    explanation: '位をそろえて、ていねいに計算しましょう。',
  }
}

function mathWordProblem(unit: string, difficulty: string): Problem {
  const hard = difficulty === 'チャレンジ'

  if (unit.includes('角度')) {
    return angleProblem(difficulty, randomInt(1, 1000))
  }

  if (unit.includes('わり算')) {
    const perBox = randomInt(3, hard ? 9 : 6)
    const boxes = randomInt(4, hard ? 16 : 9)
    const total = perBox * boxes
    return {
      kind: '文章題',
      workspace: 'sentence',
      question: `あめが${total}こあります。1ふくろに${perBox}こずつ入れると、何ふくろできますか。`,
      answer: `${boxes}ふくろ`,
      explanation: `${total} ÷ ${perBox} = ${boxes}`,
    }
  }

  if (unit.includes('かけ算') || unit.includes('体積')) {
    const rows = randomInt(3, hard ? 12 : 7)
    const cols = randomInt(4, hard ? 15 : 9)
    return {
      kind: '文章題',
      workspace: 'sentence',
      question: `カードを横に${cols}まい、たてに${rows}列ならべます。カードは全部で何まいですか。`,
      answer: `${rows * cols}まい`,
      explanation: `${cols} × ${rows} = ${rows * cols}`,
    }
  }

  if (unit.includes('時計') || unit.includes('時間')) {
    const start = randomInt(8, 10)
    const minutes = randomInt(25, hard ? 95 : 55)
    const endHour = start + Math.floor(minutes / 60)
    const endMin = minutes % 60
    return {
      kind: '文章題',
      workspace: 'sentence',
      question: `${start}時に勉強を始めて、${minutes}分間取り組みました。終わった時こくは何時何分ですか。`,
      answer: `${endHour}時${endMin}分`,
      explanation: '60分で1時間くり上がります。',
    }
  }

  const first = randomInt(18, hard ? 180 : 80)
  const second = randomInt(9, hard ? 120 : 50)
  return {
    kind: '文章題',
    workspace: 'sentence',
    question: `昨日は${first}ページ、今日は${second}ページ読みました。2日間で何ページ読みましたか。`,
    answer: `${first + second}ページ`,
    explanation: `${first} + ${second} = ${first + second}`,
  }
}

function mathChallengeProblem(unit: string, difficulty: string): Problem {
  const hard = difficulty === 'チャレンジ'
  const price = randomInt(80, hard ? 280 : 160)
  const count = randomInt(3, hard ? 12 : 7)
  const paid = Math.ceil((price * count + randomInt(20, 160)) / 100) * 100

  if (unit.includes('角度')) {
    return angleProblem(difficulty, randomInt(1, 1000))
  }

  if (unit.includes('わり算の筆算')) {
    return divisionWrittenProblem(difficulty)
  }

  if (unit.includes('小数') || unit.includes('分数')) {
    const a = randomInt(12, 48) / 10
    const b = randomInt(11, 39) / 10
    return {
      kind: '応用',
      workspace: 'sentence',
      question: `${a.toFixed(1)}mのリボンと${b.toFixed(1)}mのリボンをつなげました。全体の長さは何mですか。式も考えましょう。`,
      answer: `${(a + b).toFixed(1)}m`,
      explanation: `${a.toFixed(1)} + ${b.toFixed(1)} = ${(a + b).toFixed(1)}`,
    }
  }

  return {
    kind: '応用',
    workspace: 'sentence',
    question: `1こ${price}円のノートを${count}こ買い、${paid}円出しました。おつりはいくらですか。`,
    answer: `${paid - price * count}円`,
    explanation: `${price} × ${count} = ${price * count}、${paid} - ${price * count} = ${paid - price * count}`,
  }
}

function chooseMathProblem(unit: string, difficulty: string, style: ProblemStyle, index: number): Problem {
  if (style === '文章題ミックス') {
    return index % 3 === 2 ? mathWordProblem(unit, difficulty) : mathCalculation(unit, difficulty)
  }

  if (style === '応用多め') {
    if (index % 4 === 1) return mathWordProblem(unit, difficulty)
    if (index % 4 === 3) return mathChallengeProblem(unit, difficulty)
  }

  return mathCalculation(unit, difficulty)
}

function japaneseProblem(unit: string, index: number): Problem {
  const problems: Problem[] = [
    {
      kind: '語句',
      question: '「元気いっぱい」と同じような意味のことばを一つ書きましょう。',
      answer: 'はつらつ、いきいき など',
      explanation: '様子を表すことばを考えます。',
    },
    { kind: '語句', question: '「明るい」の反対の意味に近いことばを書きましょう。', answer: '暗い' },
    { kind: '語句', question: '「協力」の読み方をひらがなで書きましょう。', answer: 'きょうりょく' },
    { kind: '読解', question: '次の文に合うことばを選びましょう。「空が（　）ので、外で遊びました。」', answer: '晴れた' },
    {
      kind: '語句',
      question: `${unit}に関係することばを、思いつくものから二つ書きましょう。`,
      answer: '単元に合っていれば正解',
      explanation: '自分のことばで書けていればOKです。',
    },
  ]

  return problems[index % problems.length]
}

export function generateWorksheet(request: RequestData): Worksheet {
  const perDay = questionsPerDay[request.volume]
  const selectedUnits = request.selectedUnits.length ? request.selectedUnits : [request.subject === '算数' ? '計算練習' : '語彙']

  const pages = Array.from({ length: request.days }, (_, pageIndex) => {
    const problems = Array.from({ length: perDay }, (_, problemIndex) => {
      const globalIndex = pageIndex * perDay + problemIndex
      const unit = selectedUnits[globalIndex % selectedUnits.length]
      return request.subject === '算数'
        ? chooseMathProblem(unit, request.difficulty, request.problemStyle, globalIndex)
        : japaneseProblem(unit, globalIndex)
    })

    return { day: pageIndex + 1, title: `${pageIndex + 1}日目`, problems }
  })

  const problems = pages.flatMap((page) => page.problems)

  const worksheet: Worksheet = {
    title: `小${request.grade} ${request.subject} お盆休みチャレンジプリント`,
    summary: `${request.days}日分 / ${request.volume} / ${request.difficulty}${request.subject === '算数' ? ` / ${request.problemStyle}` : ''}`,
    mission: `${request.days}日間で${problems.length}問。${selectedUnits.join('・')}を、毎日少しずつやりきろう！`,
    pages,
    problems,
  }

  if (request.subject === '国語' && selectedUnits.some((unit) => unit.includes('読解'))) {
    worksheet.passage =
      '夏の朝、ゆうたは庭のあさがおに水をあげました。きのうより花が多く咲いているのを見つけ、妹にも教えてあげました。二人は、毎朝早起きして観察を続けようと約束しました。'
  }

  return worksheet
}
