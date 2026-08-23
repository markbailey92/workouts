export type PersonId = 'a' | 'b'

// Exercise names, order and doses below are transcribed from each linked video's
// own description or captions. If you change a followAlongId, re-check the video
// before editing its exercise list. `videoId` is only set when a separate clip
// demonstrates that single move — otherwise the session video is the only source.
export type Exercise = {
  id: string
  name: string
  dose: string
  cue: string
  easier: string
  videoId?: string
}

export type Workout = {
  id: string
  title: string
  minutes: number
  blurb: string
  followAlongId: string
  followAlongTitle: string
  exercises: Exercise[]
}

export const WORKOUTS: Workout[] = [
  {
    id: 'five-minute-move',
    title: 'Five Minute Move',
    minutes: 5,
    blurb: 'Five moves, 35 seconds each, 25 seconds rest between.',
    followAlongId: 'rN0h6EZd6TM',
    followAlongTitle: '5 Minute Move | Kids Workout 5 — The Body Coach TV',
    exercises: [
      {
        id: 'star-jumps',
        name: 'Star jumps',
        dose: '35 seconds',
        cue: 'Jump feet out as arms go up. Land softly.',
        easier: 'Step one foot out at a time instead of jumping.',
      },
      {
        id: 'squats',
        name: 'Squats',
        dose: '35 seconds',
        cue: 'Sit back like a chair. Chest up. Heels down. Stand tall.',
        easier: 'Hold a chair for balance, or sit and stand from a seat.',
        videoId: 'aclHkVaku9U',
      },
      {
        id: 'slow-burpees',
        name: 'Slow motion burpees',
        dose: '35 seconds',
        cue: 'Hands down, walk feet back, walk feet in, stand up.',
        easier: 'Skip the walk-back. Touch the floor and stand.',
      },
      {
        id: 'toe-sky',
        name: 'Touch toes, touch the sky',
        dose: '35 seconds',
        cue: 'Bend and reach for your toes, then stretch up as tall as you can.',
        easier: 'Touch your knees instead of your toes.',
      },
      {
        id: 'ski-jumps',
        name: 'Ski jumps',
        dose: '35 seconds',
        cue: 'Feet together, small quick jumps side to side.',
        easier: 'Step side to side instead of jumping.',
      },
    ],
  },
  {
    id: 'march-and-shuffle',
    title: 'March & Shuffle',
    minutes: 6,
    blurb: 'Five moves, 40 seconds each, 20 seconds rest between.',
    followAlongId: 'd3LPrhI0v-w',
    followAlongTitle: '5 Minute Move | Kids Workout 1 — The Body Coach TV',
    exercises: [
      {
        id: 'high-march',
        name: 'Marching on the spot',
        dose: '40 seconds',
        cue: 'Lift the knees. Swing the arms. Stay tall.',
        easier: 'Smaller steps, slower pace.',
      },
      {
        id: 'star-jumps-2',
        name: 'Star jumps',
        dose: '40 seconds',
        cue: 'Arms up, feet out. Land quietly.',
        easier: 'Step one foot out at a time.',
      },
      {
        id: 'sprint-shuffle',
        name: 'Low sprint shuffle',
        dose: '40 seconds',
        cue: 'Stay low, fast feet, shuffle side to side.',
        easier: 'March quickly on the spot instead.',
      },
      {
        id: 'chair-squats-2',
        name: 'Squats',
        dose: '40 seconds',
        cue: 'Sit back, stand up. Heels stay down.',
        easier: 'Hold a chair, or sit-to-stand from a seat.',
        videoId: 'aclHkVaku9U',
      },
      {
        id: 'climb-the-rope',
        name: 'Climb the rope',
        dose: '40 seconds',
        cue: 'Reach one hand over the other, pulling down an imaginary rope.',
        easier: 'Reach without going up on your toes.',
      },
    ],
  },
  {
    id: 'kick-reach-punch',
    title: 'Jump, Kick, Punch',
    minutes: 6,
    blurb: 'Five moves, 40 seconds each, 20 seconds rest between.',
    followAlongId: 'AOP_97n__Yk',
    followAlongTitle: '5 Minute Move | Workouts for Kids — The Body Coach TV',
    exercises: [
      {
        id: 'jump-twists',
        name: 'Jump twists',
        dose: '40 seconds',
        cue: 'Small jumps, twisting your hips one way then the other.',
        easier: 'Twist side to side with your feet staying on the floor.',
      },
      {
        id: 'star-jumps-3',
        name: 'Star jumps',
        dose: '40 seconds',
        cue: 'Arms up, feet out. Land softly.',
        easier: 'Step one foot out at a time.',
      },
      {
        id: 'front-kicks-2',
        name: 'Front kicks',
        dose: '40 seconds',
        cue: 'Kick one foot forward, then the other. Soft standing knee.',
        easier: 'Lift the knee without the kick.',
      },
      {
        id: 'toe-sky-2',
        name: 'Touch toes, touch the sky',
        dose: '40 seconds',
        cue: 'Reach down toward your toes, then stretch all the way up.',
        easier: 'Touch your knees instead of your toes.',
      },
      {
        id: 'jab-cross',
        name: 'Jab, cross, uppercut, uppercut',
        dose: '40 seconds',
        cue: 'Two straight punches forward, then two punches up.',
        easier: 'Slower punches, smaller range.',
      },
    ],
  },
  {
    id: 'mummy-lunge',
    title: 'Mummy & Lunge',
    minutes: 6,
    blurb: 'Five moves, 35 seconds each, 25 seconds rest between.',
    followAlongId: 'fAUckPMJKSY',
    followAlongTitle: '5 Minute Move | Kids Workout 4 — The Body Coach TV',
    exercises: [
      {
        id: 'squat-knee-elbow',
        name: 'Squat knee to elbow',
        dose: '35 seconds',
        cue: 'Squat down, stand up and bring a knee up to meet the elbow.',
        easier: 'Skip the squat and just tap knee to elbow.',
      },
      {
        id: 'mountain-climbers-2',
        name: 'Mountain climbers',
        dose: '35 seconds',
        cue: 'Hands under shoulders. Drive one knee up toward the elbow, then swap.',
        easier: 'Walk the knees in slowly, or do it standing against a wall.',
      },
      {
        id: 'wide-knee-elbow',
        name: 'Wide knee to elbow',
        dose: '35 seconds',
        cue: 'Arms out wide. Bring the knee out to the side to meet the elbow.',
        easier: 'Smaller lift. Drop the arms if the shoulders tire.',
      },
      {
        id: 'mummy-kicks',
        name: 'Mummy kicks',
        dose: '35 seconds',
        cue: 'Cross the arms like a mummy. Kick one foot forward, then the other.',
        easier: 'March with arms crossed. No kick.',
      },
      {
        id: 'lunge-punch',
        name: 'Lunge punches',
        dose: '35 seconds',
        cue: 'Step back into a lunge and punch forward. Switch legs.',
        easier: 'Small step, or punch in place with no lunge.',
        videoId: 'QOVaHwm-Q6U',
      },
    ],
  },
  {
    id: 'energy-burst',
    title: 'Energy Burst',
    minutes: 6,
    blurb: 'Five moves, 40 seconds each, 20 seconds rest between.',
    followAlongId: 'vzA8wMx-gew',
    followAlongTitle: '5 Minute Energising Fun Kids Workout — The Body Coach TV',
    exercises: [
      {
        id: 'arm-circles',
        name: 'Arm circles',
        dose: '40 seconds (20 each direction)',
        cue: 'Big circles — hands up and back. Switch direction halfway.',
        easier: 'Smaller circles, or one arm at a time.',
      },
      {
        id: 'knee-smashers',
        name: 'Knee smashers',
        dose: '40 seconds',
        cue: 'Hands high, then crush an imaginary watermelon down onto your knee.',
        easier: 'Step instead of hopping, and reach less high.',
      },
      {
        id: 'knee-elbow',
        name: 'Knee to elbow',
        dose: '40 seconds',
        cue: 'Arms straight out to the sides. Bring the knee up to meet the elbow.',
        easier: 'Tap the hand to the knee instead of holding the arms out.',
      },
      {
        id: 'clap-unders',
        name: 'Clap unders',
        dose: '40 seconds',
        cue: 'Lift a knee and clap your hands underneath it. Switch sides.',
        easier: 'Clap in front of you and march.',
      },
      {
        id: 'punch-jumps',
        name: 'Six punches, two jumps',
        dose: '40 seconds',
        cue: 'Stand at a diagonal. Six straight punches, then two big jumps.',
        easier: 'Six punches, then two marches. No jump.',
      },
    ],
  },
  {
    id: 'family-strength',
    title: 'Family Strength',
    minutes: 8,
    blurb: 'Eight no-equipment moves. The video counts the work and rest for you.',
    followAlongId: '0_2gU2E0HOQ',
    followAlongTitle: '7 min Family & Kids Workout — Group HIIT',
    exercises: [
      {
        id: 'running-man',
        name: 'Running man',
        dose: 'Follow the video timer',
        cue: 'Jog in place. Keep it bouncy and light.',
        easier: 'March in place.',
      },
      {
        id: 'turkey-walk',
        name: 'Turkey walk',
        dose: 'Follow the video timer',
        cue: 'Walk forward and back with a wide, waddling low step.',
        easier: 'Stay higher and take smaller steps.',
      },
      {
        id: 'start-jump',
        name: 'Star jump',
        dose: 'Follow the video timer',
        cue: 'Arms up, feet out, then back in.',
        easier: 'Step one foot out at a time.',
      },
      {
        id: 'plank-taps',
        name: 'Full plank with shoulder tap',
        dose: 'Follow the video timer',
        cue: 'High plank. Tap the opposite shoulder. Keep the hips quiet.',
        easier: 'Plank on your knees, or hold a still plank.',
        videoId: 'pSHjTRCQxIw',
      },
      {
        id: 'superman',
        name: 'Superman',
        dose: 'Follow the video timer',
        cue: 'Lie on your belly. Lift arms and legs like flying.',
        easier: 'Lift only arms, or only legs.',
        videoId: 'cc6UVRS7PW4',
      },
      {
        id: 'bird-dog',
        name: 'Bird dog',
        dose: 'Follow the video timer',
        cue: 'Hands and knees. Reach the opposite arm and leg out, then pause.',
        easier: 'Lift only an arm, or only a leg.',
      },
      {
        id: 'frog-jump',
        name: 'Frog jump',
        dose: 'Follow the video timer',
        cue: 'Squat low, then hop forward and land back in a squat.',
        easier: 'Squat and stand — no jump.',
      },
      {
        id: 'x-crunch',
        name: 'X crunch',
        dose: 'Follow the video timer',
        cue: 'On your back, reach the opposite hand and foot together, then open wide.',
        easier: 'Small marches on your back, hands on your belly.',
      },
    ],
  },
  {
    id: 'side-by-side',
    title: 'Side by Side',
    minutes: 9,
    blurb: 'Eight moves, 35 seconds each, 25 seconds rest between.',
    followAlongId: 'YIB2SJnBHBQ',
    followAlongTitle: 'Active 8 Minute Workout Featuring Izzy — The Body Coach TV',
    exercises: [
      {
        id: 'run-spot',
        name: 'Run on the spot',
        dose: '35 seconds',
        cue: 'Fast light feet. Pump the arms.',
        easier: 'March on the spot.',
      },
      {
        id: 'running-punches',
        name: 'Running punches',
        dose: '35 seconds',
        cue: 'Run on the spot and punch forward at the same time.',
        easier: 'March and punch slowly.',
      },
      {
        id: 'front-kicks-3',
        name: 'Front kicks',
        dose: '35 seconds',
        cue: 'Kick one foot forward, then the other. Soft standing knee.',
        easier: 'Knee lifts only.',
      },
      {
        id: 'crab-kicks',
        name: 'Crab kicks',
        dose: '35 seconds',
        cue: 'Sit with hands behind you, hips lifted. Kick one leg up, then the other.',
        easier: 'Hold the crab position without kicking.',
      },
      {
        id: 'squats-2',
        name: 'Squats',
        dose: '35 seconds',
        cue: 'Sit back low and stand tall. Weight in the heels.',
        easier: 'Hold a chair, or sit-to-stand from a seat.',
        videoId: 'aclHkVaku9U',
      },
      {
        id: 'press-ups',
        name: 'Press ups',
        dose: '35 seconds',
        cue: 'Hands under shoulders, body in a line. Bend the elbows and push.',
        easier: 'Knees down, or press against a wall.',
        videoId: 'IODxDxX7oi4',
      },
      {
        id: 'lateral-lunges',
        name: 'Lateral lunges',
        dose: '35 seconds',
        cue: 'Step wide to one side, sit into that hip, push back to the middle.',
        easier: 'Smaller step, or hold a chair.',
      },
      {
        id: 'walkout-toe',
        name: 'Walkout, touch your toe',
        dose: '35 seconds',
        cue: 'Hands to the floor, walk out to a plank, walk back in, stand and touch a toe.',
        easier: 'Walk out only halfway, or do it against a wall.',
      },
    ],
  },
  {
    id: 'spin-the-wheel',
    title: 'Spin the Wheel',
    minutes: 9,
    blurb: 'Eight surprise moves from the wheel. 35 seconds each, 25 seconds rest.',
    followAlongId: 'Qjcw2Vov_5k',
    followAlongTitle: '8 Minute SPIN THE WHEEL Kids Workout — The Body Coach TV',
    exercises: [
      {
        id: 'sprint',
        name: 'Sprint on the spot',
        dose: '35 seconds',
        cue: 'Knees up fast. Pump the arms and legs together.',
        easier: 'March quickly instead.',
      },
      {
        id: 'squats-3',
        name: 'Squats',
        dose: '35 seconds',
        cue: 'Sit into an imaginary chair, weight in the heels, then stand.',
        easier: 'Hold a chair, or sit-to-stand from a seat.',
        videoId: 'aclHkVaku9U',
      },
      {
        id: 'duck-walks',
        name: 'Duck walks',
        dose: '35 seconds',
        cue: 'Stay low in a squatty lunge and walk forwards, then backwards.',
        easier: 'Stay higher up, or step in place. Rest whenever you need.',
      },
      {
        id: 'kangaroo-hops',
        name: 'Kangaroo hops',
        dose: '35 seconds',
        cue: 'Hands tucked up like a pouch. Hop left to right.',
        easier: 'Step side to side instead of hopping.',
      },
      {
        id: 'press-ups-2',
        name: 'Press ups',
        dose: '35 seconds',
        cue: 'Knees on the ground, hands down. Bend the elbows and push up.',
        easier: 'Shallower reps — bend the arms only a little.',
        videoId: 'IODxDxX7oi4',
      },
      {
        id: 'pikachus',
        name: 'Pikachus',
        dose: '35 seconds',
        cue: 'Tuck down into a little ball, then explode up into a big jump.',
        easier: 'Squat down and stand up tall without the jump.',
      },
      {
        id: 'spidey-lunges',
        name: 'Spidey lunges',
        dose: '35 seconds',
        cue: 'Drop into a lunge left, then right, spinning a web each time.',
        easier: 'Shorter step, and hold something for balance.',
      },
      {
        id: 'pikachus-2',
        name: 'Pikachus again',
        dose: '35 seconds',
        cue: 'The wheel landed on it twice. Tuck down and explode up.',
        easier: 'Squat down and stand up tall without the jump.',
      },
    ],
  },
  {
    id: 'animal-adventure',
    title: 'Animal Adventure',
    minutes: 8,
    blurb: 'Five animal walks. 30 seconds each, 2 to 3 rounds — you set the pace.',
    followAlongId: 'uZRUeUfbHaU',
    followAlongTitle: '5 Animal Walk Exercises (16-second demo of all five)',
    exercises: [
      {
        id: 'frog-walk',
        name: 'Frog walk',
        dose: '30 seconds',
        cue: 'Deep squat, hands down, hop or step forward staying low.',
        easier: 'Squat and stand in place instead of moving forward.',
      },
      {
        id: 'duck-walk',
        name: 'Duck walk',
        dose: '30 seconds',
        cue: 'Stay in a low squat and waddle forward.',
        easier: 'Stay higher and take smaller steps.',
      },
      {
        id: 'gorilla-walk',
        name: 'Gorilla walk',
        dose: '30 seconds',
        cue: 'Wide feet, knuckles or hands down, swing side to side as you move.',
        easier: 'Hands on knees instead of the floor.',
      },
      {
        id: 'bunny-walk',
        name: 'Bunny walk',
        dose: '30 seconds',
        cue: 'Hands down in front, hop both feet up to meet them.',
        easier: 'Step the feet forward instead of hopping.',
      },
      {
        id: 'crab-walk',
        name: 'Crab walk',
        dose: '30 seconds',
        cue: 'Sit, hands behind you, lift the hips, walk on hands and feet.',
        easier: 'Hold the crab position and stay still.',
      },
    ],
  },
  {
    id: 'indoor-pe',
    title: 'Indoor PE',
    minutes: 18,
    blurb: 'A full PE lesson: cardio, punches and kicks, balance, core, then stretches.',
    followAlongId: 'VMj2ZgQqsNA',
    followAlongTitle: 'Exercise for Kids | Indoor Workout for Children — Miss Linky',
    exercises: [
      {
        id: 'march',
        name: 'Marching',
        dose: 'Find the beat',
        cue: 'If you can walk, you can march. Easy steps to the music.',
        easier: 'Slower, smaller steps.',
      },
      {
        id: 'high-knees',
        name: 'High knees',
        dose: 'As high as you can',
        cue: 'Drive the knees up high. Do not forget to breathe.',
        easier: 'March with a smaller knee lift.',
      },
      {
        id: 'jumping-jacks',
        name: 'Jumping jacks',
        dose: 'To the music',
        cue: 'Arms up, feet out, then back in together.',
        easier: 'Step one foot out at a time.',
      },
      {
        id: 'neck-looks',
        name: 'Look up and down, left and right',
        dose: '4 each way',
        cue: 'Look up to the roof, down to your toes, then left and right.',
        easier: 'Keep the range small.',
      },
      {
        id: 'shoulder-rolls',
        name: 'Shoulder rolls',
        dose: '5 forward, 5 back',
        cue: 'Roll the shoulders forward counting up, then backward counting down.',
        easier: 'Tiny rolls, or shrug and drop.',
      },
      {
        id: 'airplane-arms',
        name: 'Airplane arms',
        dose: '8 counts',
        cue: 'Arms out like an airplane. Tip side to side.',
        easier: 'Lower arms if the shoulders tire.',
      },
      {
        id: 'arm-circles-2',
        name: 'Arm circles',
        dose: '8 each way, small then big',
        cue: 'Point your fingers out and draw small circles, then big ones one arm at a time.',
        easier: 'Fewer circles, or rest an arm on your hip.',
      },
      {
        id: 'punches',
        name: 'Punches',
        dose: '8 front, 8 across, 8 up, 8 down',
        cue: 'Punch forward, then across your body, then up, then down.',
        easier: 'Slower punches with a smaller reach.',
      },
      {
        id: 'kicks',
        name: 'Kicks',
        dose: '4 each side',
        cue: 'Lift the knee, then straighten the leg out into the air.',
        easier: 'Knee lifts only. Hold a wall if you wobble.',
      },
      {
        id: 'one-leg',
        name: 'One-leg balance',
        dose: '10 counts each side',
        cue: 'Stand on one leg, hold your foot, put the other arm out for balance.',
        easier: 'Keep a toe on the floor, or hold a chair.',
      },
      {
        id: 'cat-cow',
        name: 'Cat-cow',
        dose: '4 of each',
        cue: 'Hands and knees. Dip the belly for cow, round the back for cat.',
        easier: 'Smaller movement. Breathe with it.',
      },
      {
        id: 'plank',
        name: 'Plank',
        dose: '10 counts',
        cue: 'Hands under shoulders, legs straight behind. Hips not sagging or high.',
        easier: 'Knees down, or plank against a wall.',
        videoId: 'pSHjTRCQxIw',
      },
      {
        id: 'mountain-climbers',
        name: 'Mountain climbers',
        dose: '3 each side',
        cue: 'From the plank, bend one leg up toward the elbow, then the other.',
        easier: 'Walk the knees in slowly.',
      },
      {
        id: 'seated-twist',
        name: 'Seated twist',
        dose: '4 each side',
        cue: 'Sit with knees bent holding a ball or pillow. Twist and touch the floor each side.',
        easier: 'Smaller twist, no need to reach the floor.',
      },
      {
        id: 'crab-stand',
        name: 'Crab stand',
        dose: '10 counts',
        cue: 'Hands and feet down, lift your bottom and hold it up straight.',
        easier: 'Rest your bottom down between counts.',
      },
      {
        id: 'seated-folds',
        name: 'Elbows to the floor, then reach for your toes',
        dose: '8 counts, then 10 counts',
        cue: 'Criss-cross your legs and fold to touch your elbows down. Then legs straight and reach for your toes.',
        easier: 'Bend the knees a little to make the toe reach easier.',
      },
      {
        id: 'cool-down',
        name: 'Cool down',
        dose: '8 counts each stretch',
        cue: 'Arm across the body, arm overhead down your back, wrist and ankle circles, shake it out, three big breaths.',
        easier: 'Hold each stretch gently and skip any that pinch.',
      },
    ],
  },
  {
    id: 'calm-yoga',
    title: 'Calm Yoga Poses',
    minutes: 8,
    blurb: 'Five animal poses with Cosmic Kids. Good for a rest day.',
    followAlongId: 'QeVh3NVfa0k',
    followAlongTitle: '5 Calming Yoga Poses For Kids — Cosmic Kids Yoga',
    exercises: [
      {
        id: 'cat-cow-pose',
        name: 'Cat-cow pose',
        dose: '4 or 5 in a row',
        cue: 'Hands and knees, fingers wide. Arch up for cat, dip the belly and wiggle the tail for cow.',
        easier: 'Smaller movement. Breathe out as you round.',
      },
      {
        id: 'dog-pose',
        name: 'Dog pose',
        dose: 'Wag the tail each side',
        cue: 'Hands and feet down, press the hips up to the sky. Reach one leg up and wag it.',
        easier: 'Stay on hands and knees, or bend the knees a lot.',
      },
      {
        id: 'pigeon-pose',
        name: 'Pigeon pose',
        dose: 'Both sides',
        cue: 'Front leg on a diagonal, back leg long behind. Fingers like tents, roll the shoulders back and puff up the chest.',
        easier: 'Sit cross-legged and lean forward gently instead.',
      },
      {
        id: 'tree-pose',
        name: 'Tree pose',
        dose: 'Both sides',
        cue: 'One heel on top of the other foot, knee out to the side. Hands at your heart, then grow your branches up.',
        easier: 'Keep the toe on the floor, or hold a wall.',
      },
      {
        id: 'whale-pose',
        name: 'Whale pose',
        dose: 'A few bubbles and pops',
        cue: 'On your back, knees bent, hands flat. Lift the hips saying "bubble, bubble" then "pop" at the top.',
        easier: 'Smaller lift, or hold at the top and breathe.',
        videoId: 'OUgsJ8-Vi0E',
      },
    ],
  },
  {
    id: 'calm-stretch',
    title: 'Calm Stretch',
    minutes: 6,
    blurb: 'Seated chair yoga. Grab a chair and sit near the front of it.',
    followAlongId: 'dnwHDN6Dw7Q',
    followAlongTitle: 'Sit and Stretch | Brain Breaks for Kids — Cosmic Kids Yoga',
    exercises: [
      {
        id: 'neck-warmup',
        name: 'Neck warm-up',
        dose: '2 each way, then a roll',
        cue: 'Look over each shoulder, tick your head side to side, rest a hand on your ear, then roll your chin around.',
        easier: 'Keep the range small and do not press with the hand.',
      },
      {
        id: 'shoulder-rolls-2',
        name: 'Shoulder rolls and lifts',
        dose: 'Round, then up-up down-down',
        cue: 'Roll the shoulders round, then lift one, lift two, drop one, drop two. Finish with a wiggle.',
        easier: 'Tiny rolls, or just shrug and drop.',
      },
      {
        id: 'backpack-reach',
        name: 'Backpack reach',
        dose: 'Both sides',
        cue: 'Reach one arm up and drop the hand down your back. Use the other arm to press the elbow down.',
        easier: 'Press very lightly, or skip the second arm.',
      },
      {
        id: 'beach-ball',
        name: 'Blow up the beach ball',
        dose: 'Long slow breaths',
        cue: 'Cup your hands around your mouth and blow the ball up bigger and bigger.',
        easier: 'Fewer, gentler breaths.',
      },
      {
        id: 'chair-twist',
        name: 'Chair twist',
        dose: 'Both sides',
        cue: 'Sit up tall, hold the back or arm of the chair, twist round and have a look. Feet stay flat.',
        easier: 'Twist only as far as feels easy.',
      },
      {
        id: 'cosmonoculars',
        name: 'Cosmonoculars',
        dose: 'Have a look around',
        cue: 'Join your thumbs and fingers into circles and look through them at the horizon.',
        easier: 'One hand at a time.',
      },
      {
        id: 'sky-rest',
        name: 'Float and rest',
        dose: 'A quiet minute',
        cue: 'Criss-cross your fingers behind your head, lean back in the chair, close your eyes and float.',
        easier: 'Hands in your lap and just breathe.',
      },
    ],
  },
]

export function getWorkout(id: string) {
  return WORKOUTS.find((workout) => workout.id === id)
}

export function isKnownExercise(workoutId: string, exerciseId: string) {
  const workout = getWorkout(workoutId)
  if (!workout) return false
  return workout.exercises.some((exercise) => exercise.id === exerciseId)
}

export function youtubeThumb(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

export function youtubeEmbed(videoId: string) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  })
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
}
