export default function formatTime(unit){
  const leadingZero = unit < 10 ? '0' : '';

  return leadingZero + unit.toString()
}