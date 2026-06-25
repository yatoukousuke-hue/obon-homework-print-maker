import { Unit } from './types'

const math = (
  grade: number,
  name: string,
  month = 7,
  available = true,
  description = 'お盆までの復習に使いやすい基礎〜標準問題です。',
): Unit => ({
  id: `math-${grade}-${name}`,
  grade,
  subject: '算数',
  name,
  availableMonth: month,
  availableByObon: available,
  prerequisites: [],
  difficultyLevel: '標準',
  description,
})

const japanese = (grade: number, name: string, month = 7, available = true): Unit => ({
  id: `jpn-${grade}-${name}`,
  grade,
  subject: '国語',
  name,
  availableMonth: month,
  availableByObon: available,
  prerequisites: [],
  difficultyLevel: '標準',
  description: '語彙力・読解力を育てる短時間練習です。',
})

export const units: Unit[] = [
  ...['10までの数', 'いくつといくつ', 'たし算', 'ひき算', '時計の読み方'].map((x) => math(1, x)),
  ...['たし算・ひき算の筆算', '1000までの数', '時こくと時間', '長さ', 'かけ算の準備'].map((x) => math(2, x)),
  ...['かけ算の復習', 'わり算', '大きな数', '時こくと時間', '表とグラフ'].map((x) => math(3, x)),
  ...['大きな数', 'わり算の筆算', '角度', '折れ線グラフ', '小数のしくみ'].map((x) => math(4, x)),
  ...['整数と小数', '体積', '小数のかけ算', '小数のわり算', '合同な図形', '倍数と約数'].map((x) => math(5, x)),
  ...['対称な図形', '分数と整数', '分数のかけ算', '分数のわり算'].map((x) => math(6, x)),
  math(6, '比', 9, false, '9月以降に扱うことが多い先取り単元です。'),
  math(6, '資料の調べ方', 9, false, '9月以降に扱うことが多い先取り単元です。'),
  ...['漢字の読み書き', 'ことばあつめ', '短いお話の読解'].map((x) => japanese(1, x)),
  ...['漢字の読み書き', '主語と述語', '物語文の読解'].map((x) => japanese(2, x)),
  ...['漢字の読み書き', 'つなぎことば', '説明文の読解'].map((x) => japanese(3, x)),
  ...['漢字の読み書き', 'ことわざ・慣用句', '読解'].map((x) => japanese(4, x)),
  ...['漢字の読み書き', '熟語', '読解'].map((x) => japanese(5, x)),
  ...['漢字の読み書き', '語彙', '読解'].map((x) => japanese(6, x)),
]
