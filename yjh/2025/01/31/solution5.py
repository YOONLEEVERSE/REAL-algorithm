# https://school.programmers.co.kr/learn/courses/30/lessons/67257

def infix_to_postfix(expression, precedence):
    stack = []
    output = []
    temp_num = ''
    for char in expression:
        if char.isnumeric():
            temp_num += char
        else:
            if temp_num != '':
                output.append(temp_num)
                temp_num = ''
            while stack and stack[-1] != '(' and precedence[char] <= precedence[stack[-1]]:
                output.append(stack.pop())
            stack.append(char)
    if temp_num != '':
        output.append(temp_num)
    while stack:
        output.append(stack.pop())

    return ' '.join(output)

def eval_postfix(expression):
    stack = []
    for token in expression.split():
        if token.isdigit():
            stack.append(int(token))
        else:
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)

    return abs(stack[0])

def solution(expression):
    answer = []
    answer.append(eval_postfix(infix_to_postfix(expression, {'+': 1, '-': 2, '*': 3})))
    answer.append(eval_postfix(infix_to_postfix(expression, {'+': 1, '-': 3, '*': 2})))
    answer.append(eval_postfix(infix_to_postfix(expression, {'+': 2, '-': 1, '*': 3})))
    answer.append(eval_postfix(infix_to_postfix(expression, {'+': 2, '-': 3, '*': 1})))
    answer.append(eval_postfix(infix_to_postfix(expression, {'+': 3, '-': 1, '*': 2})))
    answer.append(eval_postfix(infix_to_postfix(expression, {'+': 3, '-': 2, '*': 1})))
    return max(answer)

print(solution("100-200*300-500+20"))