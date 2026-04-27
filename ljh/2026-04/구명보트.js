// function solution(people, limit) {
//   let answer = 0;

//   const checked = Array.from({ length: people.length }, () => false);

//   people.sort((a, b) => a - b);

//   for (let i = people.length - 1; i >= 0; i--) {
//     if (checked[i]) {
//       continue;
//     }

//     checked[i] = true;
//     for (let j = i - 1; j >= 0; j--) {
//       //안되면 여기서 이분탐색 들어가야지 뭐.
//       if (!checked[j] && people[i] + people[j] <= limit) {
//         checked[j] = true;
//         break;
//       }
//     }

//     answer++;
//   }

//   return answer;
// }

function solution(people, limit) {
  let answer = 0;

  const numberMap = Array.from({ length: 241 }, () => []); //0 => 40, 200 => 240
  const checked = Array.from({ length: people.length }, () => false); // 짝 있는 지 판별

  people.sort((a, b) => b - a); // 내림차순 정렬
  people.forEach((p, idx) => numberMap[p].push(idx));

  for (let i = 0; i < people.length; i++) {
    if (checked[i]) continue;

    answer++;
    numberMap[people[i]] = numberMap[people[i]].filter((p) => p !== i);

    const target = limit - people[i];

    if (target < 0 || target > 240) continue;

    for (let j = target; j >= 0; j--) {
      const companionIdx = numberMap[j].pop();
      checked[companionIdx] = true;
      break;
    }
  }

  return answer;
}
console.log(solution([70, 50, 80, 50], 240)); // 3대면 충분
console.log(solution([70, 80, 50], 100));

// ── two pointer 풀이 ──────────────────────────────────────────────
//
// 핵심 그리디: 정렬 후 가장 무거운(right)과 가장 가벼운(left)을 묶으려 시도한다.
//
// 왜 이게 성립하는가? (교환 논증)
//
// [경우 1] people[left] + people[right] > limit
//   → left는 현재 가장 가벼운 사람. 다른 누구든 left보다 무겁거나 같으므로
//     right는 어떤 사람과도 같이 탈 수 없다. 혼자 보내는 것이 유일한 선택.
//
// [경우 2] people[left] + people[right] <= limit
//   → 둘을 묶어도 손해가 없음을 교환 논증으로 보인다.
//     최적해에서 right가 M과 짝지어져 있고 left가 X와 짝지어져 있다고 가정하면:
//       (right, M)  +  (left, X)
//     이를 (right, left) + (M, X)로 교환하면:
//       - right + left <= limit  ✓  (left <= M 이므로 right+left <= right+M <= limit)
//       - M + X <= limit         ✓  (X <= right 이므로 M+X <= M+right <= limit)
//     교환해도 배의 수가 늘지 않으므로, right와 left를 묶는 최적해가 반드시 존재한다.
//
// 따라서: 묶을 수 있으면 묶고(left++, right--), 못 묶으면 right만 혼자 보낸다(right--).

function solution2(people, limit) {
  people.sort((a, b) => a - b);
  let left = 0, right = people.length - 1, answer = 0;

  while (left <= right) {
    if (people[left] + people[right] <= limit) left++;
    right--;
    answer++;
  }

  return answer;
}
console.log(solution2([70, 50, 80, 50], 240));
console.log(solution2([70, 80, 50], 100));
