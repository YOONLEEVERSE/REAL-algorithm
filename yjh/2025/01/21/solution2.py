# https://school.programmers.co.kr/learn/courses/30/lessons/70129

def change_radix(num, radix):
    if num == 0:
        return '0'
    nums = []
    while num:
        num, digit = divmod(num, radix)
        nums.append(str(digit))
    return ''.join(reversed(nums))

def solution(s):
    answer = [0, 0]
    while s != '1':
        zero_cnt = s.count('0')
        one_cnt = len(s) - zero_cnt
        s = change_radix(one_cnt, 2)
        answer[1] += zero_cnt
        answer[0] += 1
    return answer

print(solution("110010101001"))