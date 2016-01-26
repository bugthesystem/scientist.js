import "babel-polyfill";

import chai from "chai";

import {Observation} from "../src/index";


chai.should();

describe("Observation:", () => {
    let observation;

    beforeEach(() => {
        observation = new Observation();
    });

    describe("#ctor", () => {

        it("should create instance.", ()=> {
            (!!observation).should.be.equal(true);
        });
    });
});