# https://school.programmers.co.kr/learn/courses/30/lessons/76502

def is_valid(s):
    stack = []
    for c in s:
        if c == '(' or c == '{' or c == '[':
            stack.append(c)
        if len(stack) > 0:
            if c == ')' and stack[-1] == '(':
                stack.pop()
            elif c == '}' and stack[-1] == '{':
                stack.pop()
            elif c == ']' and stack[-1] == '[':
                stack.pop()
    return len(stack) == 0

def solution(s):
    answer = 0
    s = list(s)
    s_len = len(s)
    for _ in range(s_len):
        if is_valid(s):
            answer += 1
        s.append(s.pop(0))

    return answer

print(solution("[](){}"))