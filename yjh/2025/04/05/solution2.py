# https://school.programmers.co.kr/learn/courses/30/lessons/388352

from itertools import combinations

def solution(n, q, ans):
    answer = 0
    all_case = list(combinations(range(1, n + 1), len(q[0])))
    for case in all_case:
        is_pass = True
        for i, e in enumerate(q):
            if len(set(case).intersection(e)) != ans[i]:
                is_pass = False
                break
        if is_pass:
            answer += 1
    return answer

print(solution(10, [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [3, 7, 8, 9, 10], [2, 5, 7, 9, 10], [3, 4, 5, 6, 7]], [2, 3, 4, 3, 3]))
