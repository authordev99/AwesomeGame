function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}
export function shuffle(s) {
  const arr = s.split('');
  const n = arr.length;

  for(let i=0 ; i<n-1 ; ++i) {
    const j = getRandomInt(n);

    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  s = arr.join('');
  return s;
}
