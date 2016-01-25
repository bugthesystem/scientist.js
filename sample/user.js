export default class User {
    constructor(name) {
        this.name = name;
    }

    can(permission, model) {
        console.log('[USER] can');
        return false;
    }
}