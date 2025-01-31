# https://school.programmers.co.kr/learn/courses/30/lessons/42839

from itertools import permutations

def check_prime(num):
    if num < 2:
        return False

    for i in range(2, num):
        if num % i == 0:
            return False
    return True

def solution(numbers):
    test_case = list(map(''.join, permutations(numbers)))
    for i in range(1, len(numbers)):
        test_case.extend(list(map(''.join, permutations(numbers, i))))
    return len(set(filter(check_prime, [int(x) for x in test_case])))

print(solution("011"))