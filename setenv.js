const env = process.env.NODE_ENV;
if (env === 'production') {
  console.log(`API_URL=https://ptrade-api.herokuapp.com/v1`);
} else {
  console.log(`API_URL=https://ptrade-api-staging.herokuapp.com/v1`);
}
console.log(`IEX_URL="https://api.iextrading.com/1.0/stock`);
