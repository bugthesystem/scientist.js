import BehaviourMissingError from './errors/behaviour-missing-error';

export default class BaseExperiment {
    constructor(name) {
        this._name = name;
        this._runIf = true;
        this._publishers = [];

        this.Control = null;//Internal
        this.Candidate = null;//Internal
        this._percentageEnabled = false;
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

    runIf(runIf) {
        this._runIf = runIf;
    }


    run() {
        if (this.Control === null) {
            throw new BehaviourMissingError(this, "Control");
        }

        //TODO: implement

    }

    ///internal
    __publish(result) {
        for (let publisher in this._publishers) {
            publisher.publish(result);
        }
    }
}