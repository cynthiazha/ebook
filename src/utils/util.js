export function addStyle (href) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.querySelector('head').appendChild(link)
}

export function removeCss (href) {
  const link = document.getElementsByTagName('link')
  for (var i = link.length; i >= 0; i--) {
    if (link[i] && link[i].getAttribute('href') != null && link[i].getAttribute('href').indexOf(href) !== -1) {
      link[i].parentNode.removeChild(link[i])
    }
  }
}

export function removeAllCss () {
  removeCss('http://localhost:8090/theme/theme_default.css')
  removeCss('http://localhost:8090/theme/theme_eye.css')
  removeCss('http://localhost:8090/theme/theme_gold.css')
  removeCss('http://localhost:8090/theme/theme_night.css')
}

export function findThemeObject (theme, themeList) {
  const result = themeList.filter(item => item.name === theme)
  return result.length && result[0].style.body
}
