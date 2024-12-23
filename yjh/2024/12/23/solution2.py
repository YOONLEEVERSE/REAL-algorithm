# https://school.programmers.co.kr/learn/courses/30/lessons/340212

def solution(diffs, times, limit):
    min_level = min(diffs)
    max_level = max(diffs)

    while min_level <= max_level:
        mid_level = (min_level + max_level) // 2

        if can_solve(diffs, times, mid_level, limit):
            max_level = mid_level - 1
        else:
            min_level = mid_level + 1

    return min_level


def can_solve(diffs, times, level, limit):
    total_time = 0
    for i, diff in enumerate(diffs):
        if diff <= level:
            total_time += times[i]
        else:
            if i < 1:
                total_time += (times[i]) * (diff - level) + times[i]
            else:
                total_time += (times[i] + times[i - 1]) * (diff - level) + times[i]

    return limit >= total_time

print(solution([1, 5, 3], [2, 4, 7], 30))
