module.exports = class Toggles {
    static globalCensor = false;
    static globalUwu = false;
    static uwuChance = 0;

    static any() {
        return (this.globalCensor || this.globalUwu || this.uwuChance > 0);
    }
}