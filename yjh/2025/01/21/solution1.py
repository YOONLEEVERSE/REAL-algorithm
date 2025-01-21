# https://school.programmers.co.kr/learn/courses/30/lessons/68935

def change_radix(val, radix):
    if val == 0:
        return '0'
    vals = []
    while val:
        val, digit = divmod(val, radix)
        vals .append(str(digit))
    return ''.join(reversed(vals))

def solution(n):
    return int(change_radix(n, 3)[::-1], 3)

print(solution(125))