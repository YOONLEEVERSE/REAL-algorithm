# https://school.programmers.co.kr/learn/courses/30/lessons/42883

def solution(number, k):
    answer = []

    for num in number:
        while k > 0 and answer and answer[-1] < num:
            answer.pop()
            k -= 1
        answer.append(num)

    return ''.join(answer[:len(answer) - k])

print(solution("4177252841", 4))
