# https://school.programmers.co.kr/learn/courses/30/lessons/87390

def solution(n, left, right):
    answer = []
    for i in range(left, right + 1):
        quotient, remainder = i // n, i % n
        answer.append(max(quotient, remainder) + 1)

    return answer

print(solution(4, 7, 14))
