import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagem } from '../models/Mensagem';
import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';
import { Negociacao } from '../models/Negociacao';

export class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        this._service = new NegociacaoService();
        this._init();
    }

    _init() {
        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();
        this._service.cadastra(negociacao)
            .then((mensagem) => {
                this._mensagem.texto = 'Negoçiação Adicionada';
                this._limpaFormulario();
                this._listaNegociacoes.adiciona(negociacao);
            }).catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));
    }

    importaNegociacoes() {

        Promise.all([
            this._service.obterNegociacoesDaSemana(),
            this._service.obterNegociacoesDaSemanaAnterior(),
            this._service.obterNegociacoesDaSemanaRetrasada()]
        )
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            )
            .then(negociacoes => {
                negociacoes
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso';
            }).catch(erro => this._mensagem.texto = erro);
    }

    apaga() {

        this._service.apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}

let negociacaoController = new NegociacaoController();

export function currentInstance(){
    return negociacaoController;
};