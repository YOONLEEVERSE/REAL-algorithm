# https://school.programmers.co.kr/learn/courses/30/lessons/92335

def change_radix(val, radix):
    if radix == 10:
        return str(val)
    if val == 0:
        return '0'

    vals = []
    while val:
        val, digit = divmod(val, radix)
        vals.append(str(digit))
    return ''.join(reversed(vals))

def is_prime(number):
    if number < 2:
        return False

    for i in range(2, int(number ** 0.5) + 1):
        if number % i == 0:
            return False
    return True

def solution(n, k):
    answer = 0
    n = change_radix(n, k)
    split_n = n.split('0')
    for c in split_n:
        if not c.isdigit():
            continue
        if is_prime(int(c)):
            answer += 1
    return answer

print(solution(437674, 3))
print(solution(110011, 10))
print(solution( 56011, 6))
