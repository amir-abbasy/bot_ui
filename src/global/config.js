var Config = {
  dev: true,
  api_url: (() => this.dev)
    ? 'http://127.0.0.1:8000'
    : 'https://intra-arb-bot-test.herokuapp.com/',
}



export default Config
