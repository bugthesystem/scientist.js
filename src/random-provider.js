export default class RandomProvider {
    randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
}