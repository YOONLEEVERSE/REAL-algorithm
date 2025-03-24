# https://school.programmers.co.kr/learn/courses/30/lessons/118667

from collections import deque

def solution(queue1, queue2):
    q1, q2 = deque(queue1), deque(queue2)
    q1_sum, q2_sum = sum(q1), sum(q2)
    max_len = max(len(q1), len(q2))

    for i in range(3 * max_len):
        if q1_sum == q2_sum:
            return i

        if q1_sum > q2_sum:
            num = q1.popleft()
            q2.append(num)
            q1_sum, q2_sum = q1_sum - num, q2_sum + num
        else:
            num = q2.popleft()
            q1.append(num)
            q1_sum, q2_sum = q1_sum + num, q2_sum - num

    return -1

print(solution([1, 2, 1, 2], [1, 10, 1, 2]))
