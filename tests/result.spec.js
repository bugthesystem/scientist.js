import "babel-polyfill";

import chai from "chai";

import {Result} from "../src/index";


var should = chai.should();

describe("Result:", () => {
    let result;

    beforeEach(() => {
        result = new Result(null);
    });

    describe("#ctor", () => {

        it("should create instance.", ()=> {
            (!!result).should.be.equal(true);
        });

        it("should create observations as empty array.", ()=> {
            result.observations.length.should.be.equal(0);
        });

        it("should create experimentIn as null", ()=> {
            (result.experimentIn === null).should.be.equal(true);
        });
    });

    describe("#observations", () => {

        it("should set observations", ()=> {
            var expected = [{}];
            result.observations = expected;
            result.observations.length.should.be.equal(expected.length);
        });
    });
});