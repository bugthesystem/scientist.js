import BaseExperiment from './base-experiment';
import BehaviourNotUniqueError from './errors/behaviour-not-unique-error';
import RandomProvider from './random-provider';
import DateTimeProvider from './datetime-provider';

export default class Experiment extends BaseExperiment {
    constructor(name) {
        super(name || "Experiment", new RandomProvider(), new DateTimeProvider());
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
