export default class Result {
    constructor(experimentIn) {
        this._experimentIn = experimentIn || null;
        this._observations = [];
    }

    get observations() {
        return this._observations;
    }

    set observations(value) {
        this._observations = value;
    }

    get experimentIn() {
        return this._experimentIn;
    }

    set experimentIn(value) {
        this._experimentIn = value;
    }
}