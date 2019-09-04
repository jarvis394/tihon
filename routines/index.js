/**
 * This file used to execute routine functions
 */

if (process.env.MODE !== 'DISABLED') {

  // Do stuff on shutdown
  require('./restart')

  // Auto send messages
  require('./auto')

  // Auto accept friend requests
  require('./friends')
  
  // Auto resolve captchas
  // require('./captcha')

  // Get data
  require('./getData')

}