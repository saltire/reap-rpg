export type Point = {
  id: number,
  name: string,
  description: string,
  exits: number[],
  actions?: Action[],
};

export type Action = {
  id: number,
  name: string,
  requires?: {
    character?: Partial<Character>,
    flags?: Record<string, boolean>,
  },
  description: string,
  resultText?: string,
  result?: Result,
  choices?: Result[],
};

export type Result = {
  // description?: string,
  character?: Partial<Character>,
  flags?: Record<string, boolean>,
  moveTo?: number,
};

export type Character = {
  body: number,
  bone: number,
  blood: number,
  lore: number,
  veilWalk?: number,
};

const points: Point[] = [
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
          { character: { body: 1 } },
          { character: { bone: 1 } },
          { character: { blood: 1 } },
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
        description: 'One local is willing to meet with you. “Necromancer...we’ve not seen one like you in a while. Please, they don’t realize it. Their prayers will be the death of us.”',
        resultText: 'Increase Lore +1.',
        result: {
          character: { lore: 1 },
        },
      },
    ],
  },
  {
    id: 3,
    name: 'The Pass',
    description: 'A well worn trail leads through the forest, nestled between large rolling hills. An eerie stillness hangs in the air.',
    exits: [2, 4],
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
        result: {
          character: { veilWalk: 2 },
        },
      },
    ],
  },
  {
    id: 5,
    name: 'The Forest',
    description: 'The dense forest of this realm is teeming with life. It grows unnaturally, as is responding to your presence.',
    exits: [1, 2, 7, 8],
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
          { character: { body: 1 } },
          { character: { bone: 1 } },
          { character: { blood: 1 } },
        ],
      },
      {
        id: 62,
        name: 'DELVE',
        requires: { character: { lore: 2 } },
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
          character: { lore: 1 },
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
  },
  {
    id: 600,
    name: 'The Horror',
    description: 'High priest Lysander has seen god. He certainly saw a god, but not the one he was looking for. Ever since that fateful day, he has been playing that organ in the church. At first the locals were worried, and then they joined along. The song is infectious, and slowly changes anyone who lends their voice.\n\nPut an end to the music, and reap Lysander’s soul.',
    exits: [],
  },
];

export default points;
