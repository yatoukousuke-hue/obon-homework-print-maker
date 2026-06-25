import { Problem, RequestData, Worksheet } from './types'
const n=(a:number,b:number)=>Math.floor(Math.random()*(b-a+1))+a
const count={少なめ:5,普通:10,多め:15}
function mathProblem(unit:string,d:string):Problem { const easy=d==='やさしい'; const hard=d==='難しい';
 if(unit.includes('わり算')) { const b=n(2, easy?5:9), q=n(2,hard?12:9), a=b*q; return {question:`${a} ÷ ${b} を計算しましょう。`,answer:`${q}`,explanation:`${b} × ${q} = ${a} になることを使います。`} }
 if(unit.includes('かけ算')) { const a=n(2,hard?12:9),b=n(2,hard?12:9);return {question:`${a} × ${b} を計算しましょう。`,answer:`${a*b}`} }
 if(unit.includes('分数')) { const b=n(2,5),a=n(1,b-1),c=n(1,b-1);return {question:`${a}/${b} + ${c}/${b} を計算しましょう。`,answer:`${a+c}/${b}`} }
 if(unit.includes('小数')) { const a=n(12,89)/10,b=n(11,49)/10;return {question:`${a} + ${b} を計算しましょう。`,answer:`${(a+b).toFixed(1)}`} }
 const a=n(easy?1:10,hard?99:50), b=n(easy?1:5,hard?80:30);return {question:`${a} + ${b} を計算しましょう。`,answer:`${a+b}`} }
function japaneseProblem(unit:string,i:number):Problem { const set=[
{question:'「気持ちがはずむ」とは、どんな様子ですか。',answer:'うれしくて楽しい気持ちになる様子'}, {question:'「静か」の反対の意味に近い言葉を書きましょう。',answer:'にぎやか'}, {question:'「協力」の読み方を書きましょう。',answer:'きょうりょく'}, {question:'文に合う言葉を選びましょう。「雨がやみ、空が（　）。」',answer:'晴れた'}]; return set[i%set.length] }
export function generateWorksheet(r:RequestData):Worksheet { const amount=count[r.volume]; const selected=r.selectedUnits.length?r.selectedUnits:[r.subject==='算数'?'計算練習':'語彙']; const problems:Problem[]=[]; for(let i=0;i<amount;i++) problems.push(r.subject==='算数'?mathProblem(selected[i%selected.length],r.difficulty):japaneseProblem(selected[i%selected.length],i));
 const worksheet:Worksheet={title:`小学${r.grade}年 ${r.subject} 夏休み学習プリント`,summary:`${r.purpose}｜${r.difficulty}｜${r.volume}` ,problems}; if(r.subject==='国語'&&selected.some(x=>x.includes('読解'))) worksheet.passage='夏の朝、ゆうたは庭のあさがおに水をあげました。昨日より花が多く咲いているのを見つけ、妹にも教えてあげました。二人は、明日も早起きして観察しようと約束しました。'; return worksheet }
