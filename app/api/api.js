/**
 *  url to create a new user session
 */
export const urlCreateSession = `${process.env.API_URL}/sessions`;
/**
 * url to create a new user
 */
export const urlCreateUser = `${process.env.API_URL}/users`;

/**
 *
 * @param  {integer} id User id
 *
 * @return {string}     URL endpoint to get user balance
 */
export function urlGetBalance(id) {
  return `${process.env.API_URL}/users/${id}/balance`;
}

/**
 *
 * @param  {integer} id User id
 *
 * @return {string}     URL endpoint to get user positions
 */
export function urlGetPositions(id) {
  return `${process.env.API_URL}/users/${id}/positions`;
}

/**
 *
 * @param  {integer} id User id
 *
 * @return {string}     URL endpoint to get user portfolio chart
 */
export function urlGetChart(id) {
  return `${process.env.API_URL}/users/${id}/charts`;
}

/**
 *
 * @param  {integer} id User id
 *
 * @return {string}     URL endpoint to create new trade order
 */
export function urlNewTrade(id) {
  return `${process.env.API_URL}/users/${id}/trades`;
}

/**
 *
 * @param  {integer} id User id
 *
 * @return {string}     URL endpoint to create new trasnfer order
 */
export function urlNewTransfer(id) {
  return `${process.env.API_URL}/users/${id}/transfers`;
}
