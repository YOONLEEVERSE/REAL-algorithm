# https://school.programmers.co.kr/learn/courses/30/lessons/1845

from collections import defaultdict

def solution(nums):
    sel_cnt = len(nums) // 2
    mon_dict = defaultdict(int)

    for num in nums:
        mon_dict[num] += 1

    return min(sel_cnt, len(mon_dict))

print(solution([3, 3, 3, 2, 2, 4]))