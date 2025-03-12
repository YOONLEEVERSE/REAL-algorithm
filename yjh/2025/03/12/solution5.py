# https://school.programmers.co.kr/learn/courses/30/lessons/138476

def solution(k, tangerine):
    answer = 0
    ordered_cnt = {}
    for t in tangerine:
        ordered_cnt[t] = ordered_cnt.get(t, 0) + 1

    ordered_cnt = dict(sorted(ordered_cnt.items(), key=lambda item: item[1], reverse=True))
    keys = [x for x in ordered_cnt.keys()]
    for key in keys:
        if k <= 0:
            break
        cnt = ordered_cnt.pop(key)
        k -= cnt
        answer += 1

    return answer

print(solution(6, [1, 3, 2, 5, 4, 5, 2, 3]))