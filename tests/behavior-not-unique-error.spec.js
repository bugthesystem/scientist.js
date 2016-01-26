import "babel-polyfill";

import chai from "chai";

import BehaviourNotUniqueError from '../src/errors/behaviour-not-unique-error';

var should = chai.should();

describe("BehaviourNotUniqueError:", () => {
    let badBehaviorError;

    beforeEach(() => {
        badBehaviorError = new BehaviourNotUniqueError(null, "");
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
            (`${(null || {name: "test"}).name} already has ${""} behaviour`).should.be.equal('test already has  behaviour');
        });
    });
});