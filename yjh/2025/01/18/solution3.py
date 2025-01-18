# https://school.programmers.co.kr/learn/courses/30/lessons/12926

def solution(s, n):
    answer = ''
    for c in s:
        if not c.isspace():
            base_c = ord('a' if c.islower() else "A")
            c = chr(base_c + (ord(c) - base_c + n) % 26)
        answer += c
    return answer

print(solution("a B z", 4))