import BadBehaviourError from './bad-behaviour-error';

export default class MissingBehaviourError extends BadBehaviourError {
    constructor(experiment, name) {
        super(experiment || null, name || "", `${(experiment || {name: ""}).name} missing ${name} behaviour`);
    }
}