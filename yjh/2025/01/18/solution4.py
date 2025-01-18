# https://school.programmers.co.kr/learn/courses/30/lessons/12930

def solution(s):
    answer = ''
    idx = 0
    for c in s:
        if c.isspace():
            answer += ' '
            idx = 0
            continue

        if idx % 2 == 0:
            answer += c.upper()
        else:
            answer += c.lower()
        idx += 1

    return answer

print(solution("try hello world"))