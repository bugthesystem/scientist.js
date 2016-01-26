import BadBehaviourError from './bad-behaviour-error';

export default class BehaviourNotUniqueError extends BadBehaviourError {
    constructor(experiment, name) {
        super(experiment || null, name || "", `${(experiment || {name: ""}).name} already has ${name} behaviour`);
    }
}