# https://school.programmers.co.kr/learn/courses/30/lessons/12909

def solution(s):
    a = []
    for word in s:
        if word == '(':
            a.append(word)
        elif word == ')':
            if len(a) == 0:
                return False
            a.pop()

    return len(a) == 0

print(solution("(()("))