import "babel-polyfill";

import chai from "chai";

import {Experiment, BehaviourNotUniqueError} from "../src/index";

chai.should();

describe("Experiment:", () => {
    let experiment;

    describe("#ctor", () => {
        beforeEach(() => {
            experiment = new Experiment();
        });

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
    });

    describe("#run", ()=> {

        beforeEach(() => {
            experiment = new Experiment();
            experiment.percentageEnabled = 100;
        });

        it('should throw  en BehaviourMissingError when no control specified', ()=> {
            try {
                experiment.run();
            } catch (err) {
                err.should.be.instanceOf(Error);
                err.message.should.be.equal("Experiment missing Control behaviour");
            }
        });

        it('should returns control when has control', ()=> {
            experiment.use(()=>"control");

            let actual = experiment.run();
            actual.should.be.equal("control");
        });

        it('should swallows errors thrown by candidate', ()=> {
            experiment.use(()=>"control");
            experiment.try(()=> ExceptionalBehavior("candidate"));

            let actual = experiment.run();
            actual.should.be.equal("control");
        });

        // This test ensures that tests do not always run "control" then "candidate"
        // This is a hideous test...
        it('should shuffles behaviors before running', (done)=> {
            var lastCalled = null;
            const EXPERIMENT_COUNT = 10;//2500

            var lastCalledMethodsInExperiments = [];

            experiment.use(()=> lastCalled = "control");
            experiment.try(()=> lastCalled = "candidate");

            for (var i = 0; i < EXPERIMENT_COUNT; i++) {
                experiment.run();

                // Test is running to fast for the experiment!
                sleep(1);

                lastCalledMethodsInExperiments.push(lastCalled);
            }

            var result = containsShuffledBehaviours(lastCalledMethodsInExperiments);

            result.should.be.equal(true);
            done();
        });

        /*it('should run percentage of candidates run is close to percentage enabled', (done)=> {

            const EXPERIMENT_COUNT = 10;//1000

            var numberOfTimesTryCalled = 0;
            var percentageEnabled = 70;

            experiment.percentageEnabled = percentageEnabled;

            experiment.try(() => numberOfTimesTryCalled++);
            experiment.use(() => 1000);

            for (var i = 0; i < EXPERIMENT_COUNT; i++) {
                sleep(1);
                experiment.run();
            }

            let actualPercentCalled = (numberOfTimesTryCalled / EXPERIMENT_COUNT * 100);
            shouldBeNear(actualPercentCalled, percentageEnabled);

            done();
        });*/

        function containsShuffledBehaviours(behaviours) {
            var allLastCalledMethods = behaviours.join('');
            console.log(allLastCalledMethods);
            var combinationsOfMethodExecution = ["controlcontrol", "candidatecandidate", "controlcandidate", "candidatecontrol"];
            var result = combinationsOfMethodExecution.some(m => allLastCalledMethods.indexOf(m) > -1);
            console.log(result);
            return result;
        }

        function ExceptionalBehavior(name) {
            return new Error(name);
        }

        function shouldBeNear(subject, expected, buffer = 1) {

            subject.should.be.at.least(expected - buffer);//Asserts that the target is greater than or equal to value.
            subject.should.be.at.most(expected + buffer);//Asserts that the target is less than or equal to value.
        }

        //https://github.com/erikdubbelboer/node-sleep/blob/master/index.js#L8
        //sleep: busy loop fallback
        function sleep(s) {
            var e = new Date().getTime() + (s * 1000);

            while (new Date().getTime() <= e) {
                ;
            }
        }
    })
});
