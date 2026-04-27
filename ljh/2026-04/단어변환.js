/** 3시 27분 시작
 *
 * begin -> target으로 변환하는 가장 짧은 변환 과정을 찾으려고 함.
 *
 * 한번에 한 개의 알파벳만 바꿀 수 이음.
 * words에 있는 단어로만 변환 가능.
 *
 * 변환할 수 없는 경우 0 반환
 * -> 가능성을 찾아야함. 나와 얼마나 다른지 1개만 다른 경우로 갈 수 잇음.
 *
 */

function solution(begin, target, words) {
  if (!words.includes(target)) {
    return 0;
  }

  /**  한 자리만 character가 달라야 함. */
  const isUsable = (a, b) => {
    let differenceCnt = 0;
    const differenceIdx = [];
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        differenceCnt++;
        differenceIdx.push(i);
      }
    }
    return differenceCnt === 1;
  };

  const queue = [[begin, 0]]; // 바뀐 애를 여기 넣는거니까.
  let queueIdx = 0;
  let depth = 0;

  while (queueIdx < queue.length) {
    const [curWord, curDepth] = queue[queueIdx++];

    if (curWord === target) return curDepth;

    for (word of words) {
      if (isUsable(curWord, word)) queue.push([word, curDepth + 1]);
    }
  }

  return 0;
}

console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]));
console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log"]));
