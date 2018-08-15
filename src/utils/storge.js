function getItem(key) {
  let value = window.localStorage.getItem(key)
  if(!value) return null
  return isJSON(value) ? JSON.parse(value) : value
}

function setItem(key, value) {
  let val = typeof value === 'object' ? JSON.stringify(value) : value
  window.localStorage.setItem(key, val)
}

function isJSON(str) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }

    } catch (e) {
      return false;
    }
  }
}

export default { getItem, setItem}