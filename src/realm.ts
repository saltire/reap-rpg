import { Enemy, Realm } from './types';


const acolyte: Enemy = {
  name: 'Acolyte',
  unique: true,
  health: 9,
  actions: [
    {
      roll: [1, 2],
      move: 1,
      harm: 1,
      range: [0, 1],
    },
    {
      roll: [3, 4],
      move: 1,
      harm: 2,
      range: [2, 3, 4],
    },
    {
      roll: [5, 6],
      move: 2,
      harm: 2,
      range: [0, 1],
    },
  ],
  choices: [
    { reaper: { body: 1 } },
    { reaper: { bone: 1 } },
    { reaper: { blood: 1 } },
  ],
};

const ashborn: Enemy = {
  name: 'Ashborn',
  type: 'Monster',
  health: 4,
  range: [0, 1],
  actions: [
    {
      roll: [1, 2],
      move: 1,
      harm: 1,
    },
    {
      roll: [3, 5],
      move: 2,
      harm: 1,
    },
    {
      roll: [6],
      move: 1,
      harm: 3,
    },
  ],
  result: { reaper: { body: 1 } },
};

const cultist: Enemy = {
  name: 'Cultist',
  type: 'Human',
  health: 3,
  range: [0, 1],
  actions: [
    {
      roll: [1, 2, 3],
      move: 1,
      harm: 1,
    },
    {
      roll: [4, 5],
      move: 1,
      harm: 2,
    },
    {
      roll: [6],
      move: 2,
      harm: 2,
    },
  ],
  choices: [
    { reaper: { body: 1 } },
    { reaper: { bone: 1 } },
    { reaper: { blood: 1 } },
  ],
};

const gaunt: Enemy = {
  name: 'Gaunt',
  type: 'Undead',
  health: 3,
  range: [1],
  actions: [
    {
      roll: [1, 2, 3],
      move: 1,
      harm: 2,
    },
    {
      roll: [4, 5, 6],
      move: 2,
      harm: 4,
    },
  ],
  result: { reaper: { body: 1, bone: 1 } },
};

const grin: Enemy = {
  name: 'Grin',
  type: 'Demon',
  health: 5,
  range: [2, 3],
  actions: [
    {
      roll: [1, 2, 3, 4, 5, 6],
      move: 1,
      harm: 1,
    },
  ],
  choices: [
    { reaper: { body: 1 } },
    { reaper: { bone: 1 } },
    { reaper: { blood: 1 } },
  ],
};

const realm: Realm = {
  weapons: [
    {
      name: 'Scythe',
      type: 'Blade',
      range: [1],
      actions: [
        {
          roll: [2, 3],
          move: 1,
          harm: 1,
        },
        {
          roll: [4, 5],
          move: 1,
          harm: 2,
        },
        {
          roll: [6],
          move: 2,
          harm: 2,
        },
      ],
      abilities: [{
        name: 'Reave',
        description: 'Immediately reap any enemy killed with Scythe. Those components may be used with a spell you are currently casting.',
      }],
    },
  ],
  relics: [
    {
      name: 'Neophyte’s Tome',
      effects: [
        {
          cost: { bone: 1 },
          benefit: { block: 1 },
        },
        {
          cost: { body: 1 },
          benefit: { move: 1 },
        },
        {
          cost: { blood: 1 },
          benefit: { heal: 1 },
        },
      ],
    },
  ],
  spells: [
    {
      name: 'Summon Skeleton',
      range: [1],
      actions: [
        {
          roll: [4, 5, 6],
          description: 'Summon a Skeleton in any empty adjacent space. Every round, Skeleton can Move 1, Harm1,at0or1range.\n\nSkeleton has 2 Health.',
        },
      ],
      effects: [
        {
          cost: { body: 1 },
          description: '+2 Health',
        },
        {
          cost: { bone: 1 },
          description: '+1 Harm and +1 Health',
        },
      ],
    },
    {
      name: 'Spectral Step',
      actions: [
        {
          roll: [3, 4, 5],
          description: 'Moveupto3 spaces. Every enemy whose space you move into is Haunted.',
        },
        {
          cost: { body: 1 },
          roll: [1],
          description: 'Move to any empty space on the grid.',
        },
      ],
      abilities: [
        {
          name: 'Haunted',
          description: 'Enemy takes +1 Harm this round. Next round, they cannot move.',
        },
      ],
    },
    {
      name: 'Spikes',
      range: [2, 3],
      actions: [
        {
          roll: [2, 3],
          description: 'Harm 1',
        },
        {
          roll: [4, 5],
          description: 'Harm 2',
        },
        {
          roll: [6],
          description: 'Harm 3',
        },
      ],
      effects: [
        {
          cost: { bone: 1 },
          description: '+1 Harm or +1 Range',
        },
      ],
    },
    {
      name: 'Leech',
      range: [2, 3],
      actions: [
        {
          roll: [3, 4, 5],
          description: 'Drain 2',
        },
        {
          roll: [6],
          description: 'Drain 3',
        },
      ],
      abilities: [
        {
          name: 'Drain',
          description: 'Deal Harm equal to Drain, and heal that much.',
        },
      ],
      effects: [
        {
          cost: { blood: 1 },
          description: 'Increase Drain +1',
        },
      ],
    },
    {
      name: 'Terror',
      range: [1],
      actions: [
        {
          cost: { body: 1 },
          roll: [3],
          description: 'All enemies within range deal 0 Harm this round.',
        },
        {
          roll: [4, 5, 6],
          description: 'All enemies within range deal 0 Harm this round.',
        },
      ],
      effects: [
        {
          cost: { body: 1 },
          description: 'Includes range 2 as well.',
        },
      ],
    },
    {
      name: 'Explode Corpse',
      actions: [
        {
          roll: [3, 4, 5, 6],
          description: 'Choose a corpse. It explodes, dealing 2 Harm to all Adjacent enemies. Remove corpse afterward.',
        },
      ],
      effects: [
        {
          cost: { bone: 1 },
          description: '+1 Harm',
        },
        {
          cost: { blood: 1 },
          description: 'Heal 1 for each enemy killed',
        },
      ],
    },
  ],
  vessel: {
    triggers: [
      { reaper: { lore: 2 } },
      { flags: { horrorName: true } },
      { componentTotal: 2 },
    ],
  },
  clocks: [
    {
      id: 1,
      name: 'Clock 1',
      fillDescription: 'The sound of an unholy choir rings out through the air, starting in the east, with a response from the south.',
      fillText: 'Lose one of each component you are currently carrying.',
      result: { reaper: { body: -1, bone: -1, blood: -1 } },
    },
    {
      id: 2,
      name: 'Clock 2',
      fillDescription: 'The sky darkens as a rolling fog covers the land.',
      fillText: 'No immediate effects observed.',
      result: { flags: { clock2Filled: true } },
    },
    {
      id: 3,
      name: 'Clock 3',
      fillDescription: 'Your vision swirls as a hymn rings loudly in your ears. Dropping to your knees, you pass out.',
      fillText: 'Wake in the church at Point 6. You must now face the Horror, and can complete no other actions or move to other Points.',
    },
  ],
  points: [
    {
      id: 1,
      name: 'Anchor',
      description: 'As you step through the veil, anchoring yourself to this realm, you find a stone obelisk sitting before you. A powerful source of life and death energy haunts this island. Your hunt starts now.',
      exits: [2, 5, 6],
      actions: [
        {
          id: 11,
          name: 'SEARCH',
          description: 'The corpse of one of the residents of this land leans against the altar. They won’t be needing their parts, and so you salvage what you can.',
          resultText: 'Choose 1 component to reap from the corpse: Bone, Body, or Blood.',
          choices: [
            { reaper: { body: 1 } },
            { reaper: { bone: 1 } },
            { reaper: { blood: 1 } },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'The Town',
      description: 'Shouts of panic reach you as you approach the town. “Get back!” Wandering down the main road, you find most windows and doors shutter at the sight of you.',
      exits: [1, 3, 5],
      actions: [
        {
          id: 21,
          name: 'LEARN',
          requires: [{ flags: { clock2Filled: false } }],
          description: 'One local is willing to meet with you. “Necromancer...we’ve not seen one like you in a while. Please, they don’t realize it. Their prayers will be the death of us.”',
          resultText: 'Increase Lore +1.',
          result: {
            reaper: { lore: 1 },
          },
        },
        {
          id: 22,
          name: 'DELVE',
          requires: [
            { flags: { clock2Filled: true } },
            { flags: { acolytesKey: true } },
          ],
          description: 'Barricades surround a home, a makeshift defense put up by the townsfolk. As you turn the key, you hear a roar from inside.',
          fight: {
            start: 'E3',
            terrain: ['B2', 'B3', 'C2', 'C3', 'E1', 'E2', 'E4', 'E5'],
            enemies: [
              { ...cultist, start: ['B1', 'B4'] },
              { ...ashborn, start: ['A2'] },
            ],
          },
        },
      ],
    },
    {
      id: 3,
      name: 'The Pass',
      description: 'A well worn trail leads through the forest, nestled between large rolling hills. An eerie stillness hangs in the air.',
      exits: [2, 4],
      actions: [
        {
          id: 31,
          name: 'FIGHT',
          description: 'Creatures loom ahead, congregating together. They have not noticed you, and you could slip by unseen if you wish, or spring an ambush of your own.',
          fightText: 'If you have Lore 1+, you roll 3d6 Stamina for this fight, keeping whichever two you’d like. In addition, you may start in any space on the grid.',
          fight: {
            start: 'E5',
            terrain: ['A2', 'B4', 'C2', 'C4', 'D1'],
            enemies: [
              { ...cultist, start: ['C1'] },
              { ...gaunt, start: ['B2', 'B3'] },
              { ...grin, start: ['C'] },
            ],
          },
        },
      ],
    },
    {
      id: 4,
      name: 'The Meadow',
      description: 'A break in the treeline provides you a moment in a quiet meadow. Something feels familiar here. Life and death, coming together.',
      exits: [3, 8],
      actions: [
        {
          id: 41,
          name: 'SEARCH',
          description: 'A current from the veil blows between the trees here, coalescing in this meadow. You reach out, and capture a bit of it in a bottle.',
          resultText: 'Gain Veil Walk, two uses. When you use this during exploration, you do not mark the Horror Clock when you move between Points.',
          result: { counters: { veilWalk: 2 } },
        },
      ],
    },
    {
      id: 5,
      name: 'The Forest',
      description: 'The dense forest of this realm is teeming with life. It grows unnaturally, as is responding to your presence.',
      exits: [1, 2, 7, 8],
      actions: [
        {
          id: 51,
          name: 'FIGHT',
          description: 'The canopy above shields you from the bright sun as you wander the forest. However, a wave of heat warns you of a roaring fire nearby.',
          fightText: 'This fight cannot be ignored. Once you enter this Point, you must complete this fight if it has not already been won.',
          preventMove: true,
          fight: {
            start: 'C5',
            terrain: ['A1', 'A2', 'A3', 'A4', 'A5', 'E1', 'E2', 'E3', 'E4', 'E5'],
            enemies: [
              { ...ashborn, start: ['A2', 'B2', 'C2'] },
            ],
          },
          result: { reaper: { body: 3, bone: 3, blood: 3 } },
        },
      ],
    },
    {
      id: 6,
      name: 'The Church',
      description: 'Organ music blasts through the doorway as you open it, an unseen congregation chanting in unison. The Horror you seek is within this church, if you’re ready to face it.',
      exits: [1, 7],
      actions: [
        {
          id: 61,
          name: 'SEARCH',
          description: 'An offering basket sits near the entrance. Inside are pieces of the congregation.',
          resultText: 'Reap one of any component type: Blood, Body, or Bone.',
          choices: [
            { reaper: { body: 1 } },
            { reaper: { bone: 1 } },
            { reaper: { blood: 1 } },
          ],
        },
        {
          id: 62,
          name: 'DELVE',
          requires: [{ reaper: { lore: 2 } }],
          description: 'You know the way to the organ in the church, and can damage it. When you face the Horror, they do not have access to their *Organ* special ability.',
          result: {
            flags: { disableOrgan: true },
          },
        },
        {
          id: 63,
          name: 'DELVE',
          description: 'The Horror lurks within this church. If you would like to face the Horror, you may do so. See the next page to prepare the fight.',
          result: {
            moveTo: 600,
          },
        },
      ],
    },
    {
      id: 7,
      name: 'The Boat',
      description: 'A small group of locals are arguing around a small boat. They stop and form a protective wall upon seeing your approach.',
      exits: [5, 6],
      actions: [
        {
          id: 71,
          name: 'LEARN',
          description: 'It’s not a beast you seek, it’s one of our own. The high priest Lysander has been twisted, their gospel a most vicious spell.',
          resultText: 'Increase Lore +1. In addition, learn the Horror’s name.',
          result: {
            reaper: { lore: 1 },
            flags: { horrorName: true },
          },
        },
      ],
    },
    {
      id: 8,
      name: 'Acolyte’s Lair',
      description: 'Animal and human bones are woven together to form a complex fortress at the edge of the forest.',
      exits: [4, 5],
      actions: [
        {
          id: 81,
          name: 'FIGHT',
          description: '“Grab a book, and sing along.”',
          fight: {
            start: 'C5',
            terrain: ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B5', 'C1', 'D1', 'D5', 'E1', 'E2', 'E3', 'E4', 'E5'],
            enemies: [
              { ...acolyte, start: ['C2'] },
              { ...cultist, start: ['B3', 'C3', 'D3'] },
            ],
          },
          result: {
            reaper: { lore: 1 },
            flags: { acolytesKey: true },
          },
        },
      ],
    },
    {
      id: 600,
      name: 'The Horror',
      description: 'High priest Lysander has seen god. He certainly saw a god, but not the one he was looking for. Ever since that fateful day, he has been playing that organ in the church. At first the locals were worried, and then they joined along. The song is infectious, and slowly changes anyone who lends their voice.\n\nPut an end to the music, and reap Lysander’s soul.',
      exits: [],
    },
  ],
  counterLabels: {
    veilWalk: 'Veil Walk',
  },
  flagLabels: {
    acolytesKey: 'Acolyte’s Key',
  },
};

export default realm;
