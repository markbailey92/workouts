export type PersonId = 'a' | 'b'

export type Exercise = {
  id: string
  name: string
  dose: string
  cue: string
  easier: string
  videoId: string
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
    blurb: 'Star jumps, squats, and slow burpees. Same moves, side by side.',
    followAlongId: 'rN0h6EZd6TM',
    followAlongTitle: '5 Minute Move — The Body Coach TV',
    exercises: [
      {
        id: 'star-jumps',
        name: 'Star jumps',
        dose: '35 seconds',
        cue: 'Jump feet out as arms go up. Land softly.',
        easier: 'Step one foot out at a time instead of jumping.',
        videoId: 'rN0h6EZd6TM',
      },
      {
        id: 'squats',
        name: 'Chair squats',
        dose: '35 seconds',
        cue: 'Sit back like a chair. Chest up. Stand tall.',
        easier: 'Hold a real chair for balance, or sit and stand from a seat.',
        videoId: 'aclHkVaku9U',
      },
      {
        id: 'slow-burpees',
        name: 'Slow-motion burpees',
        dose: '35 seconds',
        cue: 'Hands down, walk feet back, walk feet in, stand up.',
        easier: 'Skip the walk-back. Touch the floor and stand.',
        videoId: 'rN0h6EZd6TM',
      },
      {
        id: 'high-knees',
        name: 'High knees',
        dose: '30 seconds',
        cue: 'March or jog, driving knees up. Pump the arms.',
        easier: 'March in place with a smaller knee lift.',
        videoId: '8opcQdC-Vhw',
      },
      {
        id: 'shake-out',
        name: 'Shake it out',
        dose: '20 seconds',
        cue: 'Loose arms and legs. Big breaths. Smile at each other.',
        easier: 'Stand still and take five slow breaths.',
        videoId: 'rN0h6EZd6TM',
      },
    ],
  },
  {
    id: 'animal-adventure',
    title: 'Animal Adventure',
    minutes: 8,
    blurb: 'Crawl, hop, and crab-walk the living room together.',
    followAlongId: 'uZRUeUfbHaU',
    followAlongTitle: '5 Animal Walk Exercises',
    exercises: [
      {
        id: 'bear-crawl',
        name: 'Bear crawl',
        dose: '30 seconds',
        cue: 'Hands and feet. Knees hover. Opposite hand and foot move.',
        easier: 'Keep knees on the floor and crawl slowly.',
        videoId: 'Wgt1vdZ_YYk',
      },
      {
        id: 'frog-jumps',
        name: 'Frog jumps',
        dose: '8 jumps',
        cue: 'Squat, then hop forward and land in a squat.',
        easier: 'Squat and stand — no jump.',
        videoId: 'uZRUeUfbHaU',
      },
      {
        id: 'crab-walk',
        name: 'Crab walk',
        dose: '30 seconds',
        cue: 'Sit, hands behind you, lift hips, walk on hands and feet.',
        easier: 'Hold the crab position and stay still.',
        videoId: 'uZRUeUfbHaU',
      },
      {
        id: 'bunny-hops',
        name: 'Bunny hops',
        dose: '10 hops',
        cue: 'Feet together, small hops forward.',
        easier: 'Step forward with feet together, no hop.',
        videoId: 'uZRUeUfbHaU',
      },
      {
        id: 'superman',
        name: 'Superhero holds',
        dose: '8 lifts',
        cue: 'Lie on your belly. Lift arms and legs like flying.',
        easier: 'Lift only arms, or only legs.',
        videoId: 'cc6UVRS7PW4',
      },
    ],
  },
  {
    id: 'family-strength',
    title: 'Family Strength',
    minutes: 7,
    blurb: 'A no-equipment circuit you can both finish.',
    followAlongId: '0_2gU2E0HOQ',
    followAlongTitle: '7 min Family & Kids Workout — Group HIIT',
    exercises: [
      {
        id: 'running-man',
        name: 'Running man',
        dose: '30 seconds',
        cue: 'Jog in place. Keep it bouncy and light.',
        easier: 'March in place.',
        videoId: '0_2gU2E0HOQ',
      },
      {
        id: 'start-jump',
        name: 'Star jump',
        dose: '10 reps',
        cue: 'Same as jumping jacks — out and in.',
        easier: 'Step-touch jacks.',
        videoId: '0_2gU2E0HOQ',
      },
      {
        id: 'plank-taps',
        name: 'Plank shoulder taps',
        dose: '8 each side',
        cue: 'High plank. Tap opposite shoulder. Hips stay quiet.',
        easier: 'Plank on knees, or hold a still plank.',
        videoId: 'pSHjTRCQxIw',
      },
      {
        id: 'bird-dog',
        name: 'Bird dog',
        dose: '6 each side',
        cue: 'Hands and knees. Reach opposite arm and leg. Pause.',
        easier: 'Lift only an arm, or only a leg.',
        videoId: 'wiFNA3sqUTk',
      },
      {
        id: 'x-crunch',
        name: 'X crunch',
        dose: '10 reps',
        cue: 'On your back, reach opposite elbow toward opposite knee.',
        easier: 'Small marches on your back, hands on belly.',
        videoId: '0_2gU2E0HOQ',
      },
      {
        id: 'push-ups',
        name: 'Push-ups',
        dose: '8 reps',
        cue: 'Hands under shoulders. Body in a line. Lower and press.',
        easier: 'Wall push-ups or knee push-ups.',
        videoId: 'IODxDxX7oi4',
      },
    ],
  },
  {
    id: 'indoor-pe',
    title: 'Indoor PE',
    minutes: 10,
    blurb: 'Punches, balance, cat-cow, and a shared plank.',
    followAlongId: 'VMj2ZgQqsNA',
    followAlongTitle: 'Indoor Workout for Children — PE lesson',
    exercises: [
      {
        id: 'punches',
        name: 'Punch combo',
        dose: '8 each way',
        cue: 'Front, across, up, down. Soft knees. Do it together.',
        easier: 'Slower punches, no jump.',
        videoId: 'VMj2ZgQqsNA',
      },
      {
        id: 'kicks',
        name: 'Front kicks',
        dose: '4 each side',
        cue: 'Hold a wall if you need. Kick forward with control.',
        easier: 'Knee lifts only.',
        videoId: 'VMj2ZgQqsNA',
      },
      {
        id: 'one-leg',
        name: 'One-leg balance',
        dose: '10 seconds each',
        cue: 'Stand tall. Eyes on a spot. Switch legs.',
        easier: 'Keep a toe on the floor, or hold a chair.',
        videoId: 'VMj2ZgQqsNA',
      },
      {
        id: 'cat-cow',
        name: 'Cat-cow',
        dose: '4 of each',
        cue: 'Hands and knees. Round the back, then look up and open.',
        easier: 'Smaller movement. Breathe with it.',
        videoId: 'VMj2ZgQqsNA',
      },
      {
        id: 'plank',
        name: 'Family plank',
        dose: '20 seconds',
        cue: 'Straight line from head to heels. Breathe.',
        easier: 'Knees down, or hold a plank at the wall.',
        videoId: 'pSHjTRCQxIw',
      },
    ],
  },
  {
    id: 'march-and-shuffle',
    title: 'March & Shuffle',
    minutes: 5,
    blurb: 'Marches, star jumps, fast feet, then squats. Short and bouncy.',
    followAlongId: 'd3LPrhI0v-w',
    followAlongTitle: '5 Minute Move | Kids Workout 1 — The Body Coach TV',
    exercises: [
      {
        id: 'high-march',
        name: 'High march',
        dose: '40 seconds',
        cue: 'Lift the knees. Swing the arms. Stay tall.',
        easier: 'Smaller steps, slower pace.',
        videoId: 'd3LPrhI0v-w',
      },
      {
        id: 'star-jumps-2',
        name: 'Star jumps',
        dose: '40 seconds',
        cue: 'Arms up, feet out. Land quietly.',
        easier: 'Step-touch jacks.',
        videoId: 'd3LPrhI0v-w',
      },
      {
        id: 'sprint-shuffle',
        name: 'Sprint shuffle',
        dose: '40 seconds',
        cue: 'Fast feet on the spot. Turn side to side if you have room.',
        easier: 'March quickly without the sprint.',
        videoId: 'd3LPrhI0v-w',
      },
      {
        id: 'chair-squats-2',
        name: 'Chair squats',
        dose: '40 seconds',
        cue: 'Sit back, stand up. Heels stay down.',
        easier: 'Hold a chair, or sit-to-stand from a seat.',
        videoId: 'aclHkVaku9U',
      },
    ],
  },
  {
    id: 'energy-burst',
    title: 'Energy Burst',
    minutes: 5,
    blurb: 'Elbows, claps, and punches. Good when you both need a reset.',
    followAlongId: 'vzA8wMx-gew',
    followAlongTitle: '5 Minute Energising Fun Kids Workout — The Body Coach TV',
    exercises: [
      {
        id: 'knee-elbow',
        name: 'Knee to elbow',
        dose: '35 seconds',
        cue: 'Arms out. Bring the opposite knee up to tap the elbow.',
        easier: 'Tap the hand to the knee instead.',
        videoId: 'vzA8wMx-gew',
      },
      {
        id: 'clap-unders',
        name: 'Clap unders',
        dose: '35 seconds',
        cue: 'Lift one knee and clap under it. Switch sides.',
        easier: 'Clap in front of the body and march.',
        videoId: 'vzA8wMx-gew',
      },
      {
        id: 'punch-jumps',
        name: 'Six punches, two jumps',
        dose: '35 seconds',
        cue: 'Six punches, then two small jumps. Repeat.',
        easier: 'Six punches, then two marches. No jump.',
        videoId: 'vzA8wMx-gew',
      },
      {
        id: 'arm-circles',
        name: 'Arm circles',
        dose: '20 seconds each way',
        cue: 'Big slow circles. Stand tall. Switch direction.',
        easier: 'Smaller circles, or one arm at a time.',
        videoId: 'vzA8wMx-gew',
      },
    ],
  },
  {
    id: 'side-by-side',
    title: 'Side by Side',
    minutes: 8,
    blurb: 'Knee push-ups, side lunges, and a walk-out. Strength you can share.',
    followAlongId: 'YIB2SJnBHBQ',
    followAlongTitle: 'Active 8 Minute Workout Featuring Izzy — The Body Coach TV',
    exercises: [
      {
        id: 'box-push-up',
        name: 'Knee push-ups',
        dose: '35 seconds',
        cue: 'Knees down. Hands under shoulders. Lower and press.',
        easier: 'Do them at the wall, or only bend a little.',
        videoId: 'YIB2SJnBHBQ',
      },
      {
        id: 'side-lunges',
        name: 'Side lunges',
        dose: '35 seconds',
        cue: 'Step wide to the right, sit into that hip, back to centre. Then left.',
        easier: 'Smaller step, or hold a chair.',
        videoId: 'QOVaHwm-Q6U',
      },
      {
        id: 'walk-outs',
        name: 'Walk-out plank',
        dose: '8 reps',
        cue: 'Hands to the floor, walk out to a plank, walk back, stand.',
        easier: 'Walk out only halfway, or do them at a wall.',
        videoId: 'YIB2SJnBHBQ',
      },
      {
        id: 'glute-bridge',
        name: 'Bridge lifts',
        dose: '10 reps',
        cue: 'On your back, knees bent. Squeeze and lift the hips. Lower slow.',
        easier: 'Smaller lift, or hold at the top for a few breaths.',
        videoId: 'OUgsJ8-Vi0E',
      },
      {
        id: 'wall-sit',
        name: 'Wall sit',
        dose: '20 seconds',
        cue: 'Back on the wall. Sit like a chair. Count together.',
        easier: 'Higher sit, or tap the wall and stand.',
        videoId: 'YIB2SJnBHBQ',
      },
    ],
  },
  {
    id: 'calm-stretch',
    title: 'Calm Stretch',
    minutes: 6,
    blurb: 'Neck, shoulders, twists, and breath. Use after a sweaty session.',
    followAlongId: 'dnwHDN6Dw7Q',
    followAlongTitle: 'Sit and Stretch — Cosmic Kids',
    exercises: [
      {
        id: 'neck-look',
        name: 'Neck looks',
        dose: '3 each side',
        cue: 'Sit tall. Look over one shoulder. Come back through centre.',
        easier: 'Keep the range small. No extra hand pressure.',
        videoId: 'dnwHDN6Dw7Q',
      },
      {
        id: 'shoulder-rolls',
        name: 'Shoulder rolls',
        dose: '8 rolls',
        cue: 'Up, back, and down. Slow. Then reverse if you like.',
        easier: 'Tiny rolls, or shrug and drop.',
        videoId: 'dnwHDN6Dw7Q',
      },
      {
        id: 'chair-twist',
        name: 'Chair twist',
        dose: '3 breaths each side',
        cue: 'Feet flat. Sit tall. Twist and look behind you.',
        easier: 'Twist only as far as feels easy.',
        videoId: 'dnwHDN6Dw7Q',
      },
      {
        id: 'cat-cow-2',
        name: 'Cat-cow',
        dose: '5 of each',
        cue: 'Hands and knees. Round, then open the chest.',
        easier: 'Do it seated: round and sit tall.',
        videoId: 'QeVh3NVfa0k',
      },
      {
        id: 'down-dog',
        name: 'Dog pose',
        dose: '20 seconds',
        cue: 'Hands and feet. Hips up. Soft knees are fine.',
        easier: 'Stay on hands and knees, or walk hands up a wall.',
        videoId: 'QeVh3NVfa0k',
      },
    ],
  },
]

export function getWorkout(id: string) {
  return WORKOUTS.find((workout) => workout.id === id)
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
