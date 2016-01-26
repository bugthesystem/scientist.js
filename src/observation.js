export default class Observation {
    constructor(experimentIn, behaviourName, block, dateTimeProvider) {
        this._experiment = experimentIn;
        this._name = behaviourName;
        this._dateTimeProvider = dateTimeProvider;

        var now = this._dateTimeProvider.now();
        try {
            this._result = block();
            this._error = null;
        }
        catch (err) {
            this._error = err;
        }

        this._duration = (this._dateTimeProvider.now() - now) / 1000; //total seconds
        //console.log(`[Observation] duration ${this._duration}`);
    }


    /**
     *
     * @param other
     * @type {Observation}
     */
    isEquivalentTo(other) {
        var bothRaisedExceptions = (other.error !== null && this._error !== null);
        var neitherRaisedExceptions = (other.error === null && this._error === null);

        var valuesAreEqual = other.result === this._result;

        var exceptionsAreEquivalent = (bothRaisedExceptions &&
        typeof other.error === typeof this._error &&
        other.error.message === this._error.message);

        //console.log(`(${neitherRaisedExceptions} && ${valuesAreEqual}) || (${bothRaisedExceptions} && ${exceptionsAreEquivalent})`);
        return (neitherRaisedExceptions && valuesAreEqual) || (bothRaisedExceptions && exceptionsAreEquivalent);
    }


    get experiment() {
        return this._experiment;
    }

    get name() {
        return this._name;
    }

    get result() {
        return this._result;
    }

    get duration() {
        return this._duration;
    }

    get error() {
        return this._error;
    }
}