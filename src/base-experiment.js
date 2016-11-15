import BehaviourMissingError from './errors/behaviour-missing-error';
import Observation from './observation';
import Result from './result';

export default class BaseExperiment {
    constructor(name, randomProvider, dateTimeProvider) {
        this._name = name;
        this._runIf = true;
        this._publishers = [];

        this.Control = null;//Internal
        this.Candidate = null;//Internal
        this._percentageEnabled = 0;

        this._randomProvider = randomProvider;
        this._dateTimeProvider = dateTimeProvider;
    }


    get percentageEnabled() {
        return this._percentageEnabled;
    }

    set percentageEnabled(value) {
        this._percentageEnabled = value;
    }

    get publishers() {
        return this._publishers;
    }

    set publishers(value) {
        this._publishers = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    runIf(runIf) {
        this._runIf = runIf;
    }


    run() {
        if (this.Control === null) {
            throw new BehaviourMissingError(this, "Control");
        }

        var result = new Result(this);
        var candidateObservation;
        var controlObservation;

        if (this._randomProvider.randomInt(0, 2) === 0) {
            controlObservation = this._getControlObservation();

            result.observations.push(controlObservation);

            candidateObservation = this._getCandidateObservation();
            if (candidateObservation !== null) {
                result.observations.push(candidateObservation);
            }
        }
        else {
            candidateObservation = this._getCandidateObservation();
            if (candidateObservation !== null) {
                result.observations.push(candidateObservation);
            }
            controlObservation = this._getControlObservation();
            result.observations.push(controlObservation);
        }

        this.__publish(Result);
        return controlObservation.result;

    }

    _getCandidateObservation() {
        let candidateObservation = null;
        if (this._experimentShouldRun()) {
            if (this._runIf === true) {
                candidateObservation = new Observation(this, "Candidate", this.Candidate, this._dateTimeProvider);
            }
        }
        return candidateObservation;
    }

    _getControlObservation() {
        return new Observation(this, "Control", this.Control, this._dateTimeProvider);
    }

    _experimentShouldRun() {
        return this._percentageEnabled > 0 && this._randomProvider.randomInt(0, 100) < this._percentageEnabled;
    }

    ///internal
    __publish(result) {
        for (let publisher in this._publishers) {
            publisher.publish(result);
        }
    }
}
