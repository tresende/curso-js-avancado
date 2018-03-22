class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    cadastra(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação cadastrada com sucesso')
            .catch(erro => {
                throw new Error("Não foi possível adicionar a negociação")
            });
    }

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }).catch(error => {
                    console.log(error)
                    reject('Não foi possível obter as negociações da semana.');
                })
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }).catch(error => {
                    console.log(error)
                    reject('Não foi possível obter as negociações da semana anterior.');
                })
        });
    }

    obterNegociacoesDaSemanaRetrasada(cb) {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }).catch(error => {
                    console.log(error)
                    reject('Não foi possível obter as negociações da semana retrasada.');
                })
        });
    }
}