const fs = require('fs')

const packageFilePath = '../../package.json'
const themeConfigFilePath = '../../src/configs/themeConfig.js'
const useSkinHookFilePath = '../../src/utility/hooks/useSkin.js'
const layoutReducerFilePath = '../../src/redux/reducers/layout/index.js'
const indexFile = '../../src/index.js'

let demo = 'demo-1'
const demoArgs = process.argv.slice(2)

if (demoArgs[0] !== undefined) {
  demo = demoArgs[0]
}

// Update Package.json File
if (fs.existsSync(packageFilePath)) {
  fs.readFile(packageFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(
      new RegExp(/("homepage":\s)("(.*)")/, 'g'),
      `$1"https://pixinvent.com/demo/vuexy-react-admin-dashboard-template-old/${demo}/"`
    )

    fs.writeFile(packageFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Update useSkin hook for each demo skin
if (fs.existsSync(useSkinHookFilePath)) {
  fs.readFile(useSkinHookFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(
      new RegExp(/(localStorage.(get|set)Item\(')(.*)('.*\))/, 'g'),
      `$1vuexy-react-${demo}-skin$4`
    )

    fs.writeFile(useSkinHookFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Update layout reducer for menu collapsed localstorage for each demo
if (fs.existsSync(layoutReducerFilePath)) {
  fs.readFile(layoutReducerFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(
      new RegExp(/(localStorage.(get|set)Item\(')(.*)('.*\))/, 'g'),
      `$1vuexy-react-${demo}-menuCollapsed$4`
    )

    fs.writeFile(layoutReducerFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Replace themeConfig file
if (fs.existsSync(themeConfigFilePath)) {
  fs.copyFile(`./demo-configs/${demo}/themeConfig.js`, themeConfigFilePath, err => {
    if (err) {
      return console.log(err)
    }
  })
}

// ** Add basename in index.js
if (fs.existsSync(indexFile)) {
  fs.readFile(indexFile, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const result = data.replace(
        '<BrowserRouter>',
        `<BrowserRouter basename='/demo/vuexy-react-admin-dashboard-template-old/${demo}'>`
      )

      fs.writeFile(indexFile, '', err => {
        if (err) {
          console.log(err)
        } else {
          fs.writeFile(indexFile, result, err => {
            if (err) {
              console.log(err)
            }
          })
        }
      })
    }
  })
}
