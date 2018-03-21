class NegociacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'negociacoes';
    }

    listaTodos() {
        return new Promise((resolve, reject) => {

            let negociacoes = [];
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();


            cursor.onsuccess = e => {
                let atual = e.target.result;
                if (atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            };

            cursor.onerror = e => {

                reject('Não foi possível adicionar a negociação');
            };

        })
    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = (e) => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');
            };
        });
    }

    apagaTodos() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear()
            request.onsuccess = (e) => {
                resolve('Apagadas!');
            };


            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível apagar as negociações');
            };

        })
    }
}

// ConnectionFactory.getConnection().then(connection => {
//     var dao = new NegociacaoDao(connection);
//     console.log(dao);
//     dao.adiciona(new Negociacao(new Date(), 7, 100))
// });
