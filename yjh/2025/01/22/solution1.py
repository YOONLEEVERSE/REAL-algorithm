# https://school.programmers.co.kr/learn/courses/30/lessons/12943

def do_func(num, cnt):
    if num == 1:
        return cnt
    if cnt == 500:
        return -1

    if num % 2 == 0:
        num /= 2
        cnt += 1
    else:
        num = num * 3 + 1
        cnt += 1

    return do_func(num, cnt)

def solution(num):
    return do_func(num, 0)

print(solution(6))