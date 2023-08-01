export default function getRandomImageURL() {
  const randomNumber = Math.floor(Math.random() * 70) + 1; //Random number for the nurse photo from 1 to 70
  return `https://i.pravatar.cc/150?img=${randomNumber}`;
}
