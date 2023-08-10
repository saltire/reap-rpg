type Point = {
  id: number,
  name: string,
  description: string,
  exits: number[],
};

const points: Point[] = [
  {
    id: 1,
    name: 'Anchor',
    description: 'As you step through the veil, anchoring yourself to this realm, you find a stone obelisk sitting before you. A powerful source of life and death energy haunts this island. Your hunt starts now.',
    exits: [2, 5, 6],
  },
  {
    id: 2,
    name: 'The Town',
    description: 'Shouts of panic reach you as you approach the town. “Get back!” Wandering down the main road, you find most windows and doors shutter at the sight of you.',
    exits: [1, 3, 5],
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
  },
  {
    id: 7,
    name: 'The Boat',
    description: 'A small group of locals are arguing around a small boat. They stop and form a protective wall upon seeing your approach.',
    exits: [5, 6],
  },
  {
    id: 8,
    name: 'Acolyte’s Lair',
    description: 'Animal and human bones are woven together to form a complex fortress at the edge of the forest.',
    exits: [4, 5],
  },
  {
    id: 100,
    name: 'The Horror',
    description: 'High priest Lysander has seen god. He certainly saw a god, but not the one he was looking for. Ever since that fateful day, he has been playing that organ in the church. At first the locals were worried, and then they joined along. The song is infectious, and slowly changes anyone who lends their voice.\n\nPut an end to the music, and reap Lysander’s soul.',
    exits: [],
  },
];

export default points;
