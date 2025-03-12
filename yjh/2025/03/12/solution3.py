# https://school.programmers.co.kr/learn/courses/30/lessons/12953

def gcd(a, b):
    while b > 0:
        a, b = b, a % b
    return a

def solution(arr):
    answer = arr[0]

    for num in arr:
        answer = answer * num // gcd(answer, num)

    return answer

print(solution([2,6,8,14]))