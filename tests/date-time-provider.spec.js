import "babel-polyfill";

import chai from "chai";

import DateTimeProvider from "../src/datetime-provider";


chai.should();

describe("DateTimeProvider:", () => {
    let dateTimeProvider;

    beforeEach(() => {
        dateTimeProvider = new DateTimeProvider();
    });

    describe("#ctor", () => {

        it("should create instance.", ()=> {
            (!!dateTimeProvider).should.be.equal(true);
        });
    });

    describe("#now", () => {

        it("should return valid date", ()=> {
            let now = dateTimeProvider.now();
            now.should.be.a('date')
        });
    });
});