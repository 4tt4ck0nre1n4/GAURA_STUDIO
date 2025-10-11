# VSCode設定ファイル作成ガイド

このガイドでは、`.vscode/settings.json`と`.vscode/extensions.json`を一から作成する方法を説明します。

## 基本的な作成手順

### Step 1: VSCodeの設定UIで確認

1. **設定画面を開く**: `Ctrl + ,` (Mac: `Cmd + ,`)
2. **JSON表示に切り替え**: 右上の「設定を開く (JSON)」アイコンをクリック
3. **ユーザー設定を確認**: 現在の設定がJSONで表示される

### Step 2: 必要な設定を特定

各項目を検索して、どのような設定が可能かを確認：

```
- "format on save" → 保存時の自動フォーマット
- "default formatter" → デフォルトのフォーマッター
- "code actions on save" → 保存時の自動アクション
```

### Step 3: プロジェクトに設定を追加

```bash
# ワークスペース設定として保存
.vscode/settings.json
```

## 情報源リスト

### 公式ドキュメント

#### VSCode公式

- Settings Reference: https://code.visualstudio.com/docs/getstarted/settings
- Variables Reference: https://code.visualstudio.com/docs/editor/variables-reference
- JSON Schema: https://code.visualstudio.com/docs/languages/json

#### 拡張機能公式

| 拡張機能     | ドキュメント                                                                   |
| ------------ | ------------------------------------------------------------------------------ |
| Prettier     | https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode     |
| ESLint       | https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint     |
| Stylelint    | https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint |
| EditorConfig | https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig  |

### テンプレート・スターターキット

#### GitHub検索

```
path:.vscode/settings.json language:json
path:.vscode/extensions.json language:json
```

#### 有名なプロジェクト例

- **Vue.js**: https://github.com/vuejs/core/tree/main/.vscode
- **React**: https://github.com/facebook/react/tree/main/.vscode
- **TypeScript**: https://github.com/microsoft/TypeScript/tree/main/.vscode
- **Vite**: https://github.com/vitejs/vite/tree/main/.vscode

## よく使う設定項目

### 基本設定

```json
{
  // エディター全般
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,

  // ファイル操作
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "files.autoSave": "onFocusChange"
}
```

### 言語別設定

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### リンター設定

```json
{
  // ESLint
  "eslint.validate": ["javascript", "javascriptreact", "typescript"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },

  // Stylelint
  "stylelint.validate": ["css", "scss", "sass"],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": "explicit"
  }
}
```

### 除外設定

```json
{
  "files.exclude": {
    "**/.git": true,
    "**/node_modules": true,
    "**/dist": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/*.code-search": true
  }
}
```

## extensions.jsonの作成方法

### 推奨拡張機能の特定

1. **現在インストールされている拡張機能を確認**:
   - 拡張機能ビュー (`Ctrl + Shift + X`)
   - 歯車アイコン → "拡張機能IDをコピー"

2. **プロジェクトタイプ別の推奨拡張機能**:

#### フロントエンド (HTML/CSS/JS)

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "stylelint.vscode-stylelint",
    "editorconfig.editorconfig"
  ]
}
```

#### TypeScript/React

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "dsznajder.es7-react-js-snippets",
    "bradlc.vscode-tailwindcss"
  ]
}
```

#### Vue.js

```json
{
  "recommendations": ["Vue.volar", "esbenp.prettier-vscode", "dbaeumer.vscode-eslint"]
}
```

## 設定の優先順位

VSCodeの設定には優先順位があります：

1. **ワークスペース設定** (`.vscode/settings.json`) ← 最優先
2. **ユーザー設定** (`settings.json`)
3. **デフォルト設定**

プロジェクト固有の設定は`.vscode/settings.json`に記述しましょう。

## 便利なコマンド

### 設定を開く

```
Ctrl + Shift + P → "Preferences: Open Settings (JSON)"
Ctrl + Shift + P → "Preferences: Open Workspace Settings (JSON)"
```

### 設定を検索

```
Ctrl + , → 検索ボックスで設定項目を検索
```

### 拡張機能の設定を確認

```
拡張機能ビュー → 拡張機能を選択 → 歯車アイコン → "拡張機能の設定"
```

## チーム開発での注意点

### コミットすべきファイル

- ✅ `.vscode/settings.json` - プロジェクト共通の設定
- ✅ `.vscode/extensions.json` - 推奨拡張機能
- ❌ `.vscode/*.code-workspace` - 個人用ワークスペース

### .gitignoreの設定例

```gitignore
# VSCode
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
!.vscode/launch.json
!.vscode/tasks.json
```

## 参考リンク集

### 公式ドキュメント

- [VSCode Settings](https://code.visualstudio.com/docs/getstarted/settings)
- [Workspace Settings](https://code.visualstudio.com/docs/editor/workspaces)
- [Settings Sync](https://code.visualstudio.com/docs/editor/settings-sync)

### コミュニティ

- [VSCode Tips and Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- [Awesome VSCode](https://github.com/viatsko/awesome-vscode)

### 拡張機能マーケットプレイス

- https://marketplace.visualstudio.com/vscode

## まとめ

1. **VSCodeのUIから探す** - 最も簡単で確実
2. **公式ドキュメントを確認** - 正確な情報
3. **拡張機能のページを見る** - 設定例が載っている
4. **他のプロジェクトを参考** - 実践的な設定
5. **チームで統一** - `.vscode/`フォルダをGit管理

設定ファイルは一度作れば、他のプロジェクトにも流用できます！
