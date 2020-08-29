declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}

// Adicinando o atributo user na interface Request do Express
// Algo similar com sobrescrever só que não perde o que já existe congifurado padrão
// usando para outra lib será que sobrescreve ? algo particular do express ?
