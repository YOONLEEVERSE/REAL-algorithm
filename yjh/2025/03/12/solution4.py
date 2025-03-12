# https://school.programmers.co.kr/learn/courses/30/lessons/12914

def solution(n):
    fibo = [0] * (n + 1)
    fibo[0], fibo[1] = 1, 2
    for i in range(2, n):
        fibo[i] = fibo[i - 1] + fibo[i - 2]
    return fibo[n - 1] % 1234567

print(solution(4))