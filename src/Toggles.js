module.exports = class Toggles {
    static globalCensor = false;
    static globalUwu = false;

    static any() {
        return (this.globalCensor || this.globalUwu);
    }
}