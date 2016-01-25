export default class BadBehaviourError extends Error {

    constructor(experimentIn, nameIn, message) {
        super(message);

        this._experiment = experimentIn;
        this._name = nameIn;

    }

    get experiment() {
        return this._experiment;
    }

    set experiment(value) {
        this._experiment = value;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}