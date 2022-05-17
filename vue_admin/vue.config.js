const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  transpileDependencies: true,
  // configureWebpack: {
  //   // 在网页包的name字段中提供应用程序的标题，以便在索引中访问。html注入正确的标题。
  //   name: name,
  //   resolve: {
  //     alias: {
  //       '@': resolve('src'),
  //       '@common': resolve('src/common'),
  //       '@comps': resolve('src/components'),
  //       '@api': resolve('src/api'),
  //       style: resolve('src/assets/style')
  //     }
  //   }
  // },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('base', resolve('baseConfig'))
      .set('public', resolve('public'))
  },
}
