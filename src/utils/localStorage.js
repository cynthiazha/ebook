import Storage from 'web-storage-cache'
const storage = new Storage()
export function setLocalStorage (key, val) {
  storage.set(key, val)
}
export function getLocalStorage (key) {
  return storage.get(key)
}
export function removeLocalStorage (key) {
  return storage.delate(key)
}
export function clearLocalStorage () {
  return storage.clear()
}
export function setBookStorage (fileName, key, val) { // 对每本书都单独设置storage
  let book = {}
  if (getLocalStorage(fileName)) {
    book = getLocalStorage(fileName) // 返回的是这本书设置的storage
  }
  book[key] = val
  setLocalStorage(fileName, book)
}
export function getBookStorage (fileName, key) {
  if (getLocalStorage(fileName)) {
    return getLocalStorage(fileName)[key]
  } else {
    return null
  }
}
export function setFontStorage (fileName, fontSize) {
  return setBookStorage(fileName, 'fontSize', fontSize)
}
export function getFontStorage (fileName) {
  return getBookStorage(fileName, 'fontSize')
}
export function setFontFamilyStorage (fileName, fontFamily) {
  return setBookStorage(fileName, 'fontFamily', fontFamily)
}
export function getFontFamilyStorage (fileName) {
  return getBookStorage(fileName, 'fontFamily')
}
export function getLocale () {
  return getLocalStorage('locale')
}
export function setLocale (locale) {
  return setLocalStorage('locale', locale)
}
export function setThemeStorage (fileName, theme) {
  return setBookStorage(fileName, 'theme', theme)
}
export function getThemeStorage (fileName) {
  return getBookStorage(fileName, 'theme')
}
