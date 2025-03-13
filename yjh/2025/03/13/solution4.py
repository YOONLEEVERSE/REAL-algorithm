# https://school.programmers.co.kr/learn/courses/30/lessons/148653

def solution(storey):
    answer = 0
    storey_split = [int(i) for i in reversed(str(storey))] + [0]
    for i, s in enumerate(storey_split):
        if s > 5:
            answer += 10 - s
            storey_split[i + 1] += 1
        elif s == 5:
            if storey_split[i + 1] < 5:
                answer += s
            else:
                answer += 10 - s
                storey_split[i + 1] += 1
        else:
            answer += s

    return answer

print(solution(2554))
