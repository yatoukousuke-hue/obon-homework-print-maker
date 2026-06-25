import { Unit } from './types'
const m = (grade:number, name:string, month=7, available=true, description='基礎を確認する問題です。'):Unit => ({id:`math-${grade}-${name}`,grade,subject:'算数',name,availableMonth:month,availableByObon:available,prerequisites:[],difficultyLevel:'標準',description})
const j = (grade:number, name:string, month=7, available=true):Unit => ({id:`jpn-${grade}-${name}`,grade,subject:'国語',name,availableMonth:month,availableByObon:available,prerequisites:[],difficultyLevel:'標準',description:'言葉の力を育てる練習です。'})
export const units:Unit[] = [
...['10までの数','いくつといくつ','たし算','ひき算','時計の読み方 基礎'].map(x=>m(1,x)), ...['たし算とひき算の筆算','1000までの数','時こくと時間','長さ','かけ算の準備'].map(x=>m(2,x)),
...['かけ算の復習','わり算','大きな数','時こくと時間','表とグラフ'].map(x=>m(3,x)), ...['大きな数','わり算の筆算','角度','折れ線グラフ','小数のしくみ'].map(x=>m(4,x)),
...['整数と小数','体積','小数のかけ算','小数のわり算','合同な図形','倍数と約数'].map(x=>m(5,x)), ...['対称な図形','分数と整数','分数のかけ算','分数のわり算','比','資料の調べ方'].map(x=>m(6,x, x==='比'||x==='資料の調べ方'?9:7,x!=='比'&&x!=='資料の調べ方')),
...['漢字の読み書き','語彙','短い説明文の読解'].map(x=>j(1,x)),...['漢字の読み書き','語彙','物語文の読解'].map(x=>j(2,x)),...['漢字の読み書き','語彙','説明文の読解'].map(x=>j(3,x)),...['漢字の読み書き','ことわざ・慣用句','読解'].map(x=>j(4,x)),...['漢字の読み書き','熟語','読解'].map(x=>j(5,x)),...['漢字の読み書き','語彙','読解'].map(x=>j(6,x))]
