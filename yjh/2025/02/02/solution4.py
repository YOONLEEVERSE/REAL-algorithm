# https://school.programmers.co.kr/learn/courses/30/lessons/42746

from functools import cmp_to_key

def key_func(o1, o2):
    if str(o2) + str(o1) >= str(o1) + str(o2):
        return 1
    return -1

def solution(numbers):
    sorted_numbers = sorted(numbers, key=cmp_to_key(key_func))
    return str(int(''.join([str(x) for x in sorted_numbers])))

print(solution([3, 30, 34, 5, 9]))