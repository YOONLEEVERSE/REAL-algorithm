# https://school.programmers.co.kr/learn/courses/30/lessons/154538

from collections import deque

def solution(x, y, n):
    queue = deque()
    queue.append((x, 0))
    visited = set()
    while queue:
        cur, j = queue.popleft()
        if cur > y or cur in visited:
            continue
        visited.add(cur)
        if cur == y:
            return j
        for k in (cur * 3, cur * 2, cur + n):
            if k <= y and k not in visited:
                queue.append((k, j + 1))
    return -1

print(solution(10, 40, 5))