# https://school.programmers.co.kr/learn/courses/30/lessons/12945

def fibo_dp(n):
    fibo = [0] * (n + 1)
    fibo[0], fibo[1] = 0, 1
    for i in range(2, n + 1):
        fibo[i] = (fibo[i - 1] + fibo[i - 2])
    return fibo[n]

def solution(n):
    return fibo_dp(n) % 1234567

print(solution(5))