# https://school.programmers.co.kr/learn/courses/30/lessons/132265

from collections import Counter

def solution(topping):
    right = Counter(topping)
    left = set()
    res = 0
    for i in topping:
        right[i] -= 1
        left.add(i)
        if right[i] == 0:
            right.pop(i)
        if len(right) == len(left):
            res += 1
    return res

print(solution([1, 2, 1, 3, 1, 4, 1, 2]))