# https://school.programmers.co.kr/learn/courses/30/lessons/12939

def solution(s):
    nums = [int(x) for x in s.split()]
    return f'{min(nums)} {max(nums)}'

print(solution("1 2 3 4"))