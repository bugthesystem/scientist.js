import "babel-polyfill";

import chai from "chai";
import sinon from "sinon";

import {Observation} from "../src/index";


chai.should();

describe("Observation:", () => {
    let observation;

    let dateTimeProvider = {
        now: function () {
        }
    }, dateTimeProviderMock;


    beforeEach(()=> {
        dateTimeProviderMock = sinon.mock(dateTimeProvider);
    });

    describe("#ctor", () => {

        it("should create instance.", ()=> {
            let dateNow = new Date();

            dateTimeProviderMock.expects("now").atLeast(2);

            observation = new Observation(null, "test", ()=> "test", dateTimeProvider);

            (!!observation).should.be.equal(true);
        });
    });

    describe("#isEquivalentTo", () => {

        it("should compares values when values are the same returns true", ()=> {
            let dummyFunction = () => "dummy result";

            let dateNow = new Date();

            dateTimeProviderMock.expects("now").returns(dateNow);
            dateTimeProviderMock.expects("now").returns(dateNow.setSeconds(dateNow.getSeconds() + 10));

            dateTimeProviderMock.expects("now").atLeast(2);

            var sut = new Observation(null, "control", dummyFunction, dateTimeProvider);
            var other = new Observation(null, "other", dummyFunction, dateTimeProvider);

            sut.isEquivalentTo(other).should.be.equal(true);
        });

        it("should compares values values are not same returns false", ()=> {
            let dummyFunction = () => "dummy result";
            let otherDummyFunction = () => "other dummy result";

            let dateNow = new Date();

            dateTimeProviderMock.expects("now").returns(dateNow);
            dateTimeProviderMock.expects("now").returns(dateNow.setSeconds(dateNow.getSeconds() + 10));

            dateTimeProviderMock.expects("now").atLeast(2);

            var sut = new Observation(null, "control", dummyFunction, dateTimeProvider);
            var other = new Observation(null, "other", otherDummyFunction, dateTimeProvider);

            sut.isEquivalentTo(other).should.be.equal(false);
        });

        it("should both raised exceptions when exceptions are same type and contain same message return true", ()=> {
            let exceptionalDummyFunction = () => {
                throw new Error("this is a test");
            };

            dateTimeProviderMock.expects("now").returns(new Date()).atLeast(2);

            var sut = new Observation(null, "control", exceptionalDummyFunction, dateTimeProvider);
            var other = new Observation(null, "other", exceptionalDummyFunction, dateTimeProvider);

            sut.isEquivalentTo(other).should.be.equal(true);
        });

        it("should both raised exceptions when exceptions are different return false", ()=> {
            let exceptionalDummyFunction1 = () => {
                throw new Error("this is a test");
            };

            let exceptionalDummyFunction2 = () => {
                throw new SyntaxError("this is a another test");
            };

            dateTimeProviderMock.expects("now").returns(new Date()).atLeast(2);

            var sut = new Observation(null, "control", exceptionalDummyFunction1, dateTimeProvider);
            var other = new Observation(null, "other", exceptionalDummyFunction2, dateTimeProvider);

            sut.isEquivalentTo(other).should.be.equal(false);
        });

        it("should throws exception by only one observation returns false", ()=> {

            let dummyFunction = () => "it is ok";

            let exceptionalDummyFunction = () => {
                throw new Error("this is a test");
            };

            dateTimeProviderMock.expects("now").returns(new Date()).atLeast(2);

            var sut = new Observation(null, "control", dummyFunction, dateTimeProvider);
            var other = new Observation(null, "other", exceptionalDummyFunction, dateTimeProvider);

            sut.isEquivalentTo(other).should.be.equal(false);
        });


    });

    afterEach(()=> {
        dateTimeProviderMock.verify();
    })
});