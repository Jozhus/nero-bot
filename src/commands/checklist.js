const checkListText = `
>>> __**Pre-boss Checklist:**__

__Important__
Damage gear
Buff freezers
Link skills
Legion
Familiars

__Buffs (If you have them / If you need them)__
Monster Park potions
Guild blessing
Decent skills
CHT / PB
Ursus
Guild skills
Echo
Alchemy Potions
Weapon Smelting
250 / 275 Chair
Gingerbread
Legion coupon
MVP coupon
`;

module.exports = {
    name: "checklist",
    execute(msg, args) {
        msg.channel.send(checkListText);
    }
};
