import BadBehaviourError from './bad-behaviour-error';

export default class BehaviourNotUniqueError extends BadBehaviourError {
    constructor(experiment, name) {
        super(experiment, name, `${experiment.name} already has ${name} behaviour`);

        this._experiment = experiment;
        this._name = name;

    }
}