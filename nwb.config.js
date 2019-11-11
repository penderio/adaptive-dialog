module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'AdaptiveDialog',
      externals: {
        react: 'React'
      }
    }
  }
}
