import { parseAndRoll } from 'roll-parser';

export const defaultCharacter = {
    description: {
        name: '',
        playerName: '',
        age: '0',
        gender: '',
        height: '',
        weight: ''
    },
    class: {
        name: ''
    },
    race: {
        name: ''
    },
    level: 1,
    alignment: '',
    background: {
        name: ''
    },
    spells: {
        cantrips: [{
            name: ''
        }],
        spells: [{
            name: ''
        }]
    },
    equipment: [],
    stats: {
        abilities: {
            str: 8,
            dex: 8,
            con: 8,
            int: 8, 
            wis: 8,
            cha: 8
        },
        feats: [{
            name: ''
        }]
    },
    proficiencies: [{
        name: ''
    }]
};
export const rollStats = (stats) => {
    for ( let key in stats.abilities ) {
        const { rolls } = parseAndRoll('4d6');
        rolls.sort().splice(0, 1);
        const stat = rolls.reduce((a, c) => a + c);
        stats.abilities[key] = stat;
    }
    return stats; 
}