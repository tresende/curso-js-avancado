class MensagemView extends View {

    constructor(elemento) {
        super(elemento)
    }

    template(model) {
        return `<p class="alert alert-info">${model._texto}</p>`;
    }
}