# https://school.programmers.co.kr/learn/courses/30/lessons/62048

from math import gcd

def solution(w,h):
    return w * h - (w + h - gcd(w, h))

print(solution(8, 12))