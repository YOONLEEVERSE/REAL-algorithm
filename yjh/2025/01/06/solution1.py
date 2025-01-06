# https://school.programmers.co.kr/learn/courses/30/lessons/12906

def solution(arr):
    answer = []
    for num in arr:
        if len(answer) == 0:
            answer.append(num)
        else:
            top = answer[-1]
            if top != num:
                answer.append(num)
    return answer

print(solution([1,1,3,3,0,1,1]))