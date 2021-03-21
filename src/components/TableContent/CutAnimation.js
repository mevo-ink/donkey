import CutAnimationSnap from 'components/CutAnimations/CutAnimationSnap'
// import CutAnimationSword from 'components/CutAnimations/CutAnimationSword'

// const animations = [
//   CutAnimationSnap,
//   CutAnimationSword
// ]

// const randomAnimationPicker = (array) => {
//   return array[Math.floor(Math.random() * array.length)]
// }

export default function CutAnimation ({ onFinish }) {
  // v2: do some logic to set the cut animation by cutPlayer and render
  // for now, randomly select Snap or Sword or ... etc

  const Animation = CutAnimationSnap

  return <Animation onFinish={onFinish} />
}
