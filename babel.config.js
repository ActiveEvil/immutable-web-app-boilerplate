module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'i18next-extract', 
      {
        outputPath: 'public/locales/{{locale}}/{{ns}}.json'
      }
    ]
  ]
};
