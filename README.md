# お盆休み 宿題プリントメーカー

小学生の保護者が、学年・科目・難易度・分量・単元を選び、家庭学習プリントを生成・印刷できる Next.js MVPです。

## ローカル起動

```bash
npm install
npm run dev
```

`http://localhost:3000` を開きます。生成後の **印刷 / PDF保存** を押し、ブラウザの印刷画面で「PDFに保存」を選択してください。

## MVPの内容

- お盆時点の単元のみを通常選択可能にし、「先取り」時だけ未習範囲を有効化
- 算数・国語の拡張可能な問題生成ロジック
- 解答付きの印刷専用レイアウト
- 管理画面（ブラウザ内保存のリクエストを確認）
- 個人情報を入力しないUI

管理者デモログイン：`admin@example.com` / `obon2026`

## Supabaseへ接続する場合

1. Supabase プロジェクトを作成し、[`supabase/schema.sql`](./supabase/schema.sql) を SQL Editor で実行します。
2. `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を `.env.local` と Vercel の環境変数に設定します。
3. `localStorage` を利用している `WorksheetMaker` と管理画面の読み書きを Supabase の `requests` テーブルに差し替えます。`src/lib/units.ts` は `units` テーブル取得へ置き換え可能です。

## OpenAI APIの拡張ポイント

`src/lib/generator.ts` の `generateWorksheet` が唯一の生成入口です。将来はこの関数をサーバー側の Route Handler / Server Action から呼び、入力条件と単元マスタをプロンプトとして渡して構造化 JSON を返す実装へ置き換えられます。MVPは外部API不要で安全に試せるテンプレート生成です。
