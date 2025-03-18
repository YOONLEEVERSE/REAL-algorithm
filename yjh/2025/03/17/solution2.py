# https://school.programmers.co.kr/learn/courses/30/lessons/87946

from itertools import permutations

def solution(k, dungeons):
    answer = 0
    all_case = permutations(dungeons, len(dungeons))
    for case in all_case:
        cur_k = k
        cur_answer = 0
        for dungeon in case:
            if dungeon[0] > cur_k:
                continue
            cur_k -= dungeon[1]
            cur_answer += 1

        if cur_answer > answer:
            answer = cur_answer

    return answer

print(solution(80, [[80,20],[50,40],[30,10]]))
