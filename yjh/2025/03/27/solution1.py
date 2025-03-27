# https://school.programmers.co.kr/learn/courses/30/lessons/135807

from math import gcd
from functools import reduce

def can_divide(arr, num):
    for n in arr:
        if n % num == 0:
            return False
    return True

def solution(arrayA, arrayB):
    gcd_a = reduce(gcd, arrayA)
    gcd_b = reduce(gcd, arrayB)

    answer_a = gcd_a if can_divide(arrayB, gcd_a) else 0
    answer_b = gcd_b if can_divide(arrayA, gcd_b) else 0

    return max(answer_a, answer_b)

print(solution([14, 35, 119], [18, 30, 102]))