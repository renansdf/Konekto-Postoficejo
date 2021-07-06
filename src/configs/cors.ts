interface ICorsConfig {
  [key: string]: {
    quote: string[];
    attachments: string[];
    contact: string[];
  }
}

const corsConfig: ICorsConfig = {
  production: {
    quote: ['https://orcamento.konekto.me'],
    attachments: ['https://orcamento.konekto.me', 'https://konekto.me'],
    contact: ['https://konekto.webflow.io', 'https://konekto.me']
  },
  development: {
    quote: ['*'],
    attachments: ['*'],
    contact: ['*']
  }
}

export default corsConfig;