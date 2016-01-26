export default class BadBehaviourError extends Error {

    constructor(experimentIn, name, message) {
        super(message || "An error occurred");

        this.message = message || "An error occurred";
        this.experiment = experimentIn || null;
        this.name = name || "";

    }
}