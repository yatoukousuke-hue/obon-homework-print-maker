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
  ...['10までの数', 'いくつといくつ', 'たし算', 'ひき算', '時計の読み方'].map((name) => math(1, name)),
  ...['3つの数の計算', '大きな数', 'かたちづくり'].map((name) => math(1, name, 9, false, '9月以降に扱うことが多い先取り単元です。')),
  ...['たし算・ひき算の筆算', '1000までの数', '時こくと時間', '長さ', 'かけ算の準備'].map((name) => math(2, name)),
  ...['かけ算九九', '三角形と四角形', '分数の入口'].map((name) => math(2, name, 9, false, '9月以降に扱うことが多い先取り単元です。')),
  ...['かけ算の復習', 'わり算', '大きな数', '時こくと時間', '表とグラフ'].map((name) => math(3, name)),
  ...['円と球', '小数', '重さ'].map((name) => math(3, name, 9, false, '9月以降に扱うことが多い先取り単元です。')),
  ...['大きな数', 'わり算の筆算', '角度', '折れ線グラフ', '小数のしくみ'].map((name) => math(4, name)),
  ...['面積', 'がい数', '小数のかけ算・わり算'].map((name) => math(4, name, 9, false, '9月以降に扱うことが多い先取り単元です。')),
  ...['整数と小数', '体積', '小数のかけ算', '小数のわり算', '合同な図形', '倍数と約数'].map((name) => math(5, name)),
  ...['平均', '単位量あたり', '割合の入口'].map((name) => math(5, name, 9, false, '9月以降に扱うことが多い先取り単元です。')),
  ...['対称な図形', '分数と整数', '分数のかけ算', '分数のわり算'].map((name) => math(6, name)),
  math(6, '比', 9, false, '9月以降に扱うことが多い先取り単元です。'),
  math(6, '資料の調べ方', 9, false, '9月以降に扱うことが多い先取り単元です。'),
  ...['漢字の読み書き', 'ことばあつめ', '短いお話の読解'].map((name) => japanese(1, name)),
  ...['カタカナと言葉', '主語の入口'].map((name) => japanese(1, name, 9, false)),
  ...['漢字の読み書き', '主語と述語', '物語文の読解'].map((name) => japanese(2, name)),
  ...['説明文の読解', 'つなぎことば'].map((name) => japanese(2, name, 9, false)),
  ...['漢字の読み書き', 'つなぎことば', '説明文の読解'].map((name) => japanese(3, name)),
  ...['ローマ字', '段落の読み取り'].map((name) => japanese(3, name, 9, false)),
  ...['漢字の読み書き', 'ことわざ・慣用句', '読解'].map((name) => japanese(4, name)),
  ...['要約', '意見文'].map((name) => japanese(4, name, 9, false)),
  ...['漢字の読み書き', '熟語', '読解'].map((name) => japanese(5, name)),
  ...['敬語', '資料を読む'].map((name) => japanese(5, name, 9, false)),
  ...['漢字の読み書き', '語彙', '読解'].map((name) => japanese(6, name)),
  ...['古典の入口', '意見文・要約'].map((name) => japanese(6, name, 9, false)),
]
