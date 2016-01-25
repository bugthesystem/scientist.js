import "babel-polyfill";

import chai from "chai";

import {Experiment, BehaviourNotUniqueError} from "../index";

chai.should();

describe("Experiment:", () => {
    let experiment;

    beforeEach(() => {
        experiment = new Experiment();
    });

    describe("#ctor", () => {

        it("should create instance.", ()=> {
            (!!experiment).should.be.equal(true);
        });

        it("should set default name", ()=> {
            experiment.name.should.be.equal("Experiment");
        });

        it("should set name", ()=> {
            var name = "TEST";
            let experiment = new Experiment(name);
            experiment.name.should.be.equal(name);
        });

        it("should set percentageEnabled to zero", ()=> {
            experiment.percentageEnabled.should.be.equal(0);
        });
    });

    describe("#use", ()=> {

        it('should throw BehaviourNotUniqueError when multiple assignments', ()=> {
            experiment.use(()=> "do something");

            try {
                experiment.use(()=> "do something else");
            } catch (err) {
                err.should.be.instanceOf(Error);
            }
        })
    })
});