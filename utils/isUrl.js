/* eslint-disable no-useless-escape */
const isUrl = require('is-url')

module.exports = url => {
  if (!url) return false

  /*const strRegex = '^((https|http|ftp|rtsp|mms)?://)'
      + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' 
      + '(([0-9]{1,3}\.){3}[0-9]{1,3}' 
      + '|' 
      + '([0-9a-z_!~*\'()-]+\.)*' 
      + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.'
      + '[a-z]{2,6})' 
      + '(:[0-9]{1,4})?' 
      + '((/?)|' 
      + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'
  const re = new RegExp(strRegex)

  return re.test(url)*/

  return isUrl(url)
}
