# https://school.programmers.co.kr/learn/courses/30/lessons/140107

def solution(k, d):
    answer = 0
    for x in range(0, d + 1, k):
        max_y = int((d ** 2 - x ** 2) ** 0.5)
        answer += (max_y // k) + 1

    return answer

print(solution(1, 5))