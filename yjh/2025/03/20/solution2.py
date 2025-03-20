# https://school.programmers.co.kr/learn/courses/30/lessons/131704

def solution(order):
    stack = []
    l = len(order)
    answer = 0
    num = 0

    while answer < l:
        if order[answer] > num:
            num += 1
            stack.append(num)
        elif order[answer] == stack[-1]:
            stack.pop()
            answer += 1
        else:
            return answer

    return answer

print(solution([5, 4, 3, 2, 1]))
print(solution([4, 3, 1, 2, 5]))
