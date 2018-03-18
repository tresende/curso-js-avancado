class NegociacaoService {
    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/semana');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText).map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                    } else {
                        reject('Não foi possível obter as negociações da semana.');
                    }
                }
            };
            xhr.send();
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/anterior');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText).map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                    } else {
                        reject('Não foi possível obter as negociações da semana anterior.');
                    }
                }
            };
            xhr.send();
        })
    }

    obterNegociacoesDaSemanaRetrasada(cb) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/retrasada');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText).map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                    } else {
                        reject('Não foi possível obter as negociações da semana anterior.');
                    }
                }
            };
            xhr.send();
        })
    }
}