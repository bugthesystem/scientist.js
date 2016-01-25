import BaseExperiment from './base-experiment';
import BehaviourNotUniqueError from './errors/behaviour-not-unique-error';

export default class Experiment extends BaseExperiment {
    constructor(name) {
        super(name || "Experiment");
    }

    use(controlIn) {
        if (this.Control !== null) {
            throw new BehaviourNotUniqueError(this, "Control");
        }

        this.Control = controlIn;
    }

    try(candidateIn) {
        this.Candidate = candidateIn;
    }

    run() {
        return super.run();
    }
}