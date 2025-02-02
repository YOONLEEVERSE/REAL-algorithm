# https://school.programmers.co.kr/learn/courses/30/lessons/42747

def solution(citations):
    citations.sort(reverse=True)
    answer = 0
    for i, citation in enumerate(citations):
        answer = max(answer, min(citation, i+1))
    return answer

print(solution([3, 0, 6, 1, 5]))