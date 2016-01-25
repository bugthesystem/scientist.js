import "babel-polyfill";

import User from './user';
import MyWidget from './my-widget';

function main() {
    let myWidget = new MyWidget();
    myWidget.allows(new User("test-user"))
}

main();
console.log("STARTED");