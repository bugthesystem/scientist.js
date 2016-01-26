import BadBehaviourError from './bad-behaviour-error';

export default class MissingBehaviourError extends BadBehaviourError {

    constructor(experiment, name) {
        super(experiment, name, `${experiment.name} missing ${name} behaviour`);

        this._experiment = experiment;
        this._name = name;

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