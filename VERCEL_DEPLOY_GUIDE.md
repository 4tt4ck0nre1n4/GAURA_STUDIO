# Vercelデプロイガイド

このプロジェクトをVercelにデプロイする手順を説明します。

## 前提条件

- ✅ GitHubアカウント
- ✅ Vercelアカウント（https://vercel.com/）
- ✅ プロジェクトがGitHubにプッシュされている

## デプロイ手順

### 方法1: Vercel Dashboard（推奨）

#### Step 1: Vercelにログイン

1. https://vercel.com/ にアクセス
2. 「Sign Up」または「Log in」をクリック
3. GitHubアカウントで認証

#### Step 2: 新しいプロジェクトをインポート

1. ダッシュボードで「Add New...」→「Project」をクリック
2. 「Import Git Repository」セクションで、このプロジェクトのリポジトリを選択
3. 「Import」をクリック

#### Step 3: プロジェクト設定

以下の設定が自動検出されるはずです：

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 20.x
```

**確認事項：**
- ✅ Framework Preset: `Vite` が選択されている
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Root Directory: `./` (デフォルト)

#### Step 4: 環境変数の設定（必要な場合）

このプロジェクトでは現在環境変数は不要ですが、今後必要になった場合：

1. 「Environment Variables」セクションを展開
2. 変数名と値を追加
3. 対象環境（Production, Preview, Development）を選択

#### Step 5: デプロイ

1. 「Deploy」ボタンをクリック
2. ビルドログを確認
3. デプロイ完了を待つ（通常1-3分）

#### Step 6: デプロイ完了

✅ デプロイが成功すると、以下が提供されます：
- **本番URL**: `https://your-project.vercel.app`
- **プレビューURL**: プルリクエストごとに自動生成

### 方法2: Vercel CLI

ローカルからデプロイする場合：

#### 1. Vercel CLIのインストール

```bash
npm install -g vercel
```

#### 2. ログイン

```bash
vercel login
```

#### 3. デプロイ

```bash
# プレビューデプロイ
vercel

# 本番デプロイ
vercel --prod
```

## 自動デプロイの設定

Vercelは自動的に以下のデプロイを実行します：

### 本番デプロイ
- `main`または`master`ブランチへのプッシュ
- 自動的に本番環境にデプロイ

### プレビューデプロイ
- プルリクエストの作成時
- 各PRごとに一意のURLを生成
- PR更新時に自動再デプロイ

## カスタムドメインの設定

### Step 1: ドメインの追加

1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」→「Domains」
3. 「Add」をクリックしてドメイン名を入力

### Step 2: DNS設定

Vercelの指示に従って、DNSレコードを設定：

**Aレコード（推奨）:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAMEレコード（サブドメイン）:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: SSL証明書

- 自動的に無料のSSL証明書が発行されます
- HTTPSが自動で有効になります

## ビルド設定の詳細

### package.json のスクリプト

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && npm run format-html",
    "preview": "vite preview"
  }
}
```

### vercel.json の説明

```json
{
  "version": 2,
  "buildCommand": "npm run build",       // ビルドコマンド
  "outputDirectory": "dist",             // 出力ディレクトリ
  "installCommand": "npm install",       // インストールコマンド
  "framework": "vite",                   // フレームワーク
  "routes": [...],                       // ルーティング設定
  "headers": [...]                       // キャッシュ設定
}
```

## トラブルシューティング

### ビルドエラーが発生する場合

#### 1. Node.jsバージョンの確認

プロジェクト設定で Node.js 20.x が選択されているか確認

#### 2. ビルドコマンドの確認

```bash
# ローカルでビルドテスト
npm run build
```

#### 3. 依存関係の確認

```bash
# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install
```

### 404エラーが発生する場合

#### ルーティング設定の確認

`vercel.json`の`routes`設定が正しいか確認：

```json
{
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/404.html",
      "status": 404
    }
  ]
}
```

### 画像が表示されない場合

#### 1. パスの確認

- 絶対パス (`/assets/images/...`) を使用
- 相対パスは避ける

#### 2. ビルド出力の確認

```bash
npm run build
# distフォルダ内を確認
```

### スタイルが適用されない場合

#### CSSファイルのインポート確認

```javascript
// main.js
import '../scss/style.scss';
```

## パフォーマンス最適化

### 1. 画像最適化

このプロジェクトでは `vite-plugin-image-optimizer` を使用：

```javascript
// vite.config.js
ViteImageOptimizer(configs.pageData.image.optimization)
```

### 2. キャッシュ設定

`vercel.json`でアセットのキャッシュを設定済み：

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 3. 圧縮

Vercelは自動的に以下を実行：
- Gzip/Brotli圧縮
- HTTP/2サポート
- 自動CDN配信

## デプロイ後の確認事項

### ✅ チェックリスト

- [ ] トップページ (`/`) が正しく表示される
- [ ] Thanksページ (`/thanks.html`) が正しく表示される
- [ ] 404ページが正しく表示される
- [ ] 画像がすべて表示される
- [ ] フォームが正しく動作する
- [ ] レスポンシブデザインが機能している
- [ ] パーティクルアニメーションが動作している
- [ ] Swiperスライダーが動作している

### パフォーマンステスト

以下のツールでパフォーマンスをチェック：

- **Lighthouse**: Chrome DevTools
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/

## 継続的インテグレーション

### GitHub Actionsとの連携（オプション）

`.github/workflows/vercel.yml` を作成して、デプロイ前のテストを実行：

```yaml
name: Vercel Deployment
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint:check
      - run: npm run build
```

## 環境ごとの設定

### Development（開発）

```bash
npm run dev
# http://localhost:8080
```

### Preview（プレビュー）

- プルリクエストごとに自動生成
- `https://your-project-git-branch-name.vercel.app`

### Production（本番）

- `main`ブランチへのマージで自動デプロイ
- `https://your-project.vercel.app`

## コスト

### Hobby Plan（個人利用）
- **無料**
- 商用利用不可
- 月間100GB帯域幅
- 無制限のプロジェクト

### Pro Plan（商用利用）
- **月額$20**
- 商用利用可能
- 月間1TB帯域幅
- 優先サポート

## 便利なコマンド

```bash
# プロジェクト情報の確認
vercel inspect

# ログの確認
vercel logs

# ドメインの一覧
vercel domains ls

# プロジェクトの削除
vercel remove project-name
```

## サポート・ドキュメント

- **Vercel公式ドキュメント**: https://vercel.com/docs
- **Viteデプロイガイド**: https://vitejs.dev/guide/static-deploy.html
- **Vercelコミュニティ**: https://github.com/vercel/vercel/discussions

## まとめ

1. ✅ GitHubリポジトリを準備
2. ✅ Vercelアカウントを作成
3. ✅ ダッシュボードからプロジェクトをインポート
4. ✅ ビルド設定を確認
5. ✅ デプロイボタンをクリック
6. ✅ デプロイ完了を待つ
7. ✅ 本番URLで動作確認

自動デプロイが設定されるので、今後は`main`ブランチにプッシュするだけで自動的にデプロイされます！

