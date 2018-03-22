export class HttpService {

    _handleErrors(res) {
        if (res.ok) {
            return res;
        } else {
            throw new Error(res.statusText);
        }
    }

    get(url) {

        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }
}