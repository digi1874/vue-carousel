import path from 'path'
import { writeFileSync, copyFile, existsSync, mkdirSync } from 'fs'
import _ from 'lodash'
import jsonfile from 'jsonfile'

import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import CleanCSS from 'clean-css'

const npmPackage = 'npm_package'
const npmDistPath = path.join(npmPackage, 'dist')
const npmSrcPath = path.join(npmPackage, 'src')
const srcPath = 'src/components'

// 创建文件夹
if (!existsSync(npmPackage)) {
  mkdirSync(npmPackage)
  mkdirSync(npmSrcPath)
  mkdirSync(npmDistPath)
}

// 拷贝文件
for (const fileName of ['LICENSE', 'README.md']) {
  const npmFileName = path.join(npmPackage, fileName)
  copyFile(fileName, npmFileName, err => {
    if (err) throw err
    console.log('\x1b[32m%s\x1b[0m', `created ${ npmFileName }✔️`)
  })
}
for (const fileName of ['Carousel.vue', 'index.js']) {
  const npmFileName = path.join(npmSrcPath, fileName)
  copyFile(path.join(srcPath, fileName), npmFileName, err => {
    if (err) throw err
    console.log('\x1b[32m%s\x1b[0m', `created ${ npmFileName }✔️`)
  })
}

// 创建 npm 包的 package.json
const packageFile = 'package.json'
const npmPackageFile = path.join(npmPackage, packageFile)
const packageJson = _.pick(jsonfile.readFileSync(packageFile), [
  'name',
  'version',
  'description',
  'main',
  'module',
  'unpkg',
  'jsdelivr',
  'repository',
  'keywords',
  'author',
  'license',
  'bugs',
  'homepage',
  'dependencies'
])
jsonfile.writeFileSync(npmPackageFile, packageJson, { spaces: 2 })
console.log('\x1b[32m%s\x1b[0m', `created ${ npmPackageFile }✔️`)

// 顶部注释
const banner = _.template(`/*!
* <%= name %> <%= version %>
* (c) 2020 <%= author %>
* Released under the <%= license %> License.
*/`)(packageJson)

const babelOption = {
  babelrc: false,
  presets: [['@babel/preset-env']]
}

export default {
  input: path.join(srcPath, 'index.js'),
  output: [
    {
      name: 'carousel',
      file: path.join(npmDistPath, 'carousel.js'),
      format: 'umd',
      banner,
      plugins: [
        getBabelOutputPlugin({
          ...babelOption,
          allowAllFormats: true
        })
      ]
    },
    {
      file: path.join(npmDistPath, 'carousel.common.js'),
      format: 'cjs',
      banner,
      plugins: [
        getBabelOutputPlugin(babelOption)
      ]
    },
    {
      file: path.join(npmDistPath, 'carousel.esm.js'),
      format: 'esm',
      banner,
      plugins: [
        getBabelOutputPlugin(babelOption)
      ]
    },
    {
      name: 'carousel',
      file: path.join(npmDistPath, 'carousel.min.js'),
      format: 'iife',
      banner,
      plugins: [
        getBabelOutputPlugin({
          ...babelOption,
          allowAllFormats: true
        }),
        terser()
      ]
    }
  ],
  plugins: [
    commonjs(),
    css({
      output(style) {
        let cssPath = path.join(npmDistPath, 'carousel.css')
        writeFileSync(cssPath, style)
        console.log('\x1b[32m%s\x1b[0m', `created ${ cssPath }✔️`)

        cssPath = path.join(npmDistPath, 'carousel.min.css')
        writeFileSync(cssPath, new CleanCSS().minify(style).styles)
        console.log('\x1b[32m%s\x1b[0m', `created ${ cssPath }✔️`)
      }
    }),
    vue({ css: false })
  ]
}
