import { Problem, RequestData, Worksheet } from './types'

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

const problemCount = {
  少なめ: 5,
  ふつう: 10,
  たっぷり: 15,
}

function mathProblem(unit: string, difficulty: string, index: number): Problem {
  const easy = difficulty === 'やさしい'
  const hard = difficulty === 'チャレンジ'

  if (unit.includes('わり算')) {
    const divisor = randomInt(2, easy ? 5 : 9)
    const quotient = randomInt(2, hard ? 14 : 9)
    const dividend = divisor * quotient
    return {
      question: `${dividend} ÷ ${divisor} を計算しましょう。`,
      answer: `${quotient}`,
      explanation: `${divisor} × ${quotient} = ${dividend} になることを使います。`,
    }
  }

  if (unit.includes('かけ算')) {
    const a = randomInt(2, hard ? 12 : 9)
    const b = randomInt(2, hard ? 12 : 9)
    return {
      question: `${a} × ${b} を計算しましょう。`,
      answer: `${a * b}`,
      explanation: `${a}を${b}こ分あわせます。`,
    }
  }

  if (unit.includes('分数')) {
    const denominator = randomInt(3, 9)
    const a = randomInt(1, denominator - 1)
    const b = randomInt(1, denominator - 1)
    return {
      question: `${a}/${denominator} + ${b}/${denominator} を計算しましょう。`,
      answer: `${a + b}/${denominator}`,
      explanation: '分母が同じなので、分子どうしをたします。',
    }
  }

  if (unit.includes('小数')) {
    const a = randomInt(12, 89) / 10
    const b = randomInt(11, 49) / 10
    return {
      question: `${a.toFixed(1)} + ${b.toFixed(1)} を計算しましょう。`,
      answer: `${(a + b).toFixed(1)}`,
      explanation: '小数点の位置をそろえて計算します。',
    }
  }

  if (unit.includes('時計') || unit.includes('時間')) {
    const start = randomInt(7, 10)
    const add = randomInt(15, hard ? 55 : 35)
    return {
      question: `${start}時${index % 2 === 0 ? '00' : '30'}分の${add}分後は何時何分ですか。`,
      answer: index % 2 === 0 ? `${start}時${add}分` : `${start + Math.floor((30 + add) / 60)}時${(30 + add) % 60}分`,
      explanation: '分をたして、60分になったら1時間くり上げます。',
    }
  }

  const a = randomInt(easy ? 1 : 10, hard ? 99 : 50)
  const b = randomInt(easy ? 1 : 5, hard ? 80 : 30)
  return {
    question: `${a} + ${b} を計算しましょう。`,
    answer: `${a + b}`,
    explanation: '一の位から順番に計算しましょう。',
  }
}

function japaneseProblem(unit: string, index: number): Problem {
  const problems: Problem[] = [
    {
      question: '「元気いっぱい」と同じような意味のことばを一つ書きましょう。',
      answer: 'はつらつ、いきいき など',
      explanation: '様子を表すことばを考えます。',
    },
    {
      question: '「明るい」の反対の意味に近いことばを書きましょう。',
      answer: '暗い',
    },
    {
      question: '「協力」の読み方をひらがなで書きましょう。',
      answer: 'きょうりょく',
    },
    {
      question: '次の文に合うことばを選びましょう。「空が（　）ので、外で遊びました。」',
      answer: '晴れた',
    },
    {
      question: `${unit}に関係することばを、思いつくものから二つ書きましょう。`,
      answer: '単元に合っていれば正解',
      explanation: '自分のことばで書けていればOKです。',
    },
  ]

  return problems[index % problems.length]
}

export function generateWorksheet(request: RequestData): Worksheet {
  const amount = problemCount[request.volume]
  const selectedUnits = request.selectedUnits.length
    ? request.selectedUnits
    : [request.subject === '算数' ? '計算練習' : '語彙']

  const problems: Problem[] = []

  for (let i = 0; i < amount; i += 1) {
    const unit = selectedUnits[i % selectedUnits.length]
    problems.push(request.subject === '算数' ? mathProblem(unit, request.difficulty, i) : japaneseProblem(unit, i))
  }

  const worksheet: Worksheet = {
    title: `小${request.grade} ${request.subject} お盆休みチャレンジプリント`,
    summary: `${request.purpose} / ${request.difficulty} / ${request.volume}`,
    mission: `今日のミッション：${selectedUnits.join('・')}を、ていねいに最後までやりきろう！`,
    problems,
  }

  if (request.subject === '国語' && selectedUnits.some((unit) => unit.includes('読解'))) {
    worksheet.passage =
      '夏の朝、ゆうたは庭のあさがおに水をあげました。きのうより花が多く咲いているのを見つけ、妹にも教えてあげました。二人は、毎朝早起きして観察を続けようと約束しました。'
  }

  return worksheet
}
