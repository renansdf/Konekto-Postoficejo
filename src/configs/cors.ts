interface ICorsConfig {
  [key: string]: {
    quote: string[];
    attachments: string[];
    contact: string[];
  }
}

const corsConfig: ICorsConfig = {
  production: {
    quote: ['https://orcamento.konekto.me/'],
    attachments: ['https://orcamento.konekto.me/', 'https://www.konekto.me'],
    contact: ['https://www.konekto.me']
  },
  development: {
    quote: ['*'],
    attachments: ['*'],
    contact: ['*']
  }
}

export default corsConfig;