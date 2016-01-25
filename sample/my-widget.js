import {Experiment, Result} from '../index';
import Permission from './permission';
import Model from './model';

export default class MyWidget {
    constructor() {
        this.model = new Model();
    }

    allows(user) {
        var experiment = new Experiment("widget-permissions");
        experiment.use(() => this.model.checkUser(user).valid); // old way
        experiment.try(() => user.can(Permission.Read, this.model)); // new way

        return experiment.run();
    }
}