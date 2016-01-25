import "babel-polyfill";

import chai from "chai";

import {Result} from "../index";


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