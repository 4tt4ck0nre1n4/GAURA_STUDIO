module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  rules: {
    // SCSS特有のルール
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer'],
      },
    ],
    'scss/dollar-variable-pattern': null,
    'scss/at-import-partial-extension': null,
    'scss/at-mixin-pattern': null, // mixin名の命名規則を無効化
    'scss/no-global-function-names': null, // map-get等の使用を許可
    'scss/at-extend-no-missing-placeholder': null, // @extendでクラス使用を許可

    // 一般的なCSSルール
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'selector-id-pattern': null, // ID命名規則を無効化（JavaScriptで使用されるため）
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],

    // セレクターの重複（メディアクエリ内での使用などで必要）
    'no-duplicate-selectors': null,
    'no-descending-specificity': null,

    // 空のブロック（意図的な場合もあるため警告レベルに）
    'block-no-empty': null,

    // プロパティの順序を自動で並び替える
    'order/properties-alphabetical-order': null,

    // セレクターの詳細度に関する警告を無効化（BEMなどで必要な場合）
    'selector-max-id': null,
    'selector-max-compound-selectors': null,
    'selector-max-specificity': null,

    // ベンダープレフィックス（autoprefixerを使用しているため）
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,

    // 非推奨プロパティ（互換性のため許可）
    'property-no-deprecated': null,
    'declaration-block-single-line-max-declarations': null,
  },
  ignoreFiles: [
    'dist/**/*',
    'src/dist/**/*',
    'node_modules/**/*',
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
  ],
};
