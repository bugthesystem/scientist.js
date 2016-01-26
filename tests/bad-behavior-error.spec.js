import "babel-polyfill";

import chai from "chai";

import BadBehaviourError from "../src/errors/bad-behaviour-error";


var should = chai.should();

describe("BadBehaviourError:", () => {
    let badBehaviorError;

    beforeEach(() => {
        badBehaviorError = new BadBehaviourError();
    });

    describe("#ctor", () => {

        it("should create instance.", ()=> {
            (!!badBehaviorError).should.be.equal(true);
        });

        it("should create experiment as null", ()=> {
            (badBehaviorError.experiment === null).should.be.equal(true);
        });

        it("should create namein as empty string", ()=> {
            (badBehaviorError.name === "").should.be.equal(true);
        });

        it("should set default message", ()=> {
            badBehaviorError.message.should.be.equal("An error occurred");
        });
    });

    describe("#message", () => {

        it("should set message", ()=> {
            var expected = "test message";
            let error = new BadBehaviourError(null, null, expected);
            error.message.should.be.equal(expected);
        });
    });

    describe("#name", () => {

        it("should set name", ()=> {
            var expected = "test name";
            let error = new BadBehaviourError(null, expected, null);
            error.name.should.be.equal(expected);
        });
    });

    describe("#experiment", () => {

        it("should set experiment", ()=> {
            var expected = {name: "test-name"};
            let error = new BadBehaviourError(expected, null, null);
            error.experiment.should.be.equal(expected);
        });
    });
});