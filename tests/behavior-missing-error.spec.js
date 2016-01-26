import "babel-polyfill";

import chai from "chai";

import MissingBehaviourError from "../src/errors/behaviour-missing-error";


var should = chai.should();

describe("MissingBehaviourError:", () => {
    let badBehaviorError;

    beforeEach(() => {
        badBehaviorError = new MissingBehaviourError(null, "");
    });

    describe("#ctor", () => {

        it("should create instance.", ()=> {
            (!!badBehaviorError).should.be.equal(true);
        });

        it("should create experiment as null", ()=> {
            (badBehaviorError.experiment === null).should.be.equal(true);
        });

        it("should create name as empty string", ()=> {
            (badBehaviorError.name === "").should.be.equal(true);
        });

        it("should set message", ()=> {
            (`${(null || {name: "test"}).name} missing ${""} behaviour`).should.be.equal('test missing  behaviour');
        });
    });
});