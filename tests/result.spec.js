import "babel-polyfill";

import chai from "chai";

import {Result} from "../src/index";


chai.should();

describe("Result:", () => {
    let result;

    beforeEach(() => {
        result = new Result();
    });

    describe("#ctor", () => {

        it("should create instance.", ()=> {
            (!!result).should.be.equal(true);
        });
    });
});