# https://school.programmers.co.kr/learn/courses/30/lessons/250136

from collections import deque

n = 0
m = 0
lines = None
land_map = None
dir_col = [1, -1, 0, 0]
dir_row = [0, 0, 1, -1]

def solution(land):
    global n, m, lines, land_map

    land_map = land
    n = len(land)
    m = len(land[0])
    lines = [0] * m

    for col in range(n):
        for row in range(m):
            if land_map[col][row] == 1:
                find_oil(col, row)

    return max(lines)


def find_oil(start_col, start_row):
    global n, m, lines, land_map, dir_col, dir_row

    oil_size = 1

    q = deque([(start_col, start_row)])
    results = {start_row}
    land_map[start_col][start_row] = 2

    while q:
        col, row = q.popleft()

        for i in range(4):
            new_col = col + dir_col[i]
            new_row = row + dir_row[i]
            if 0 <= new_col < n and 0 <= new_row < m and land_map[new_col][new_row] == 1:
                land_map[new_col][new_row] = 2
                q.append((new_col, new_row))
                oil_size += 1
                results.add(new_row)

    for line in results:
        lines[line] += oil_size


print(solution([[1, 0, 1, 0, 1, 1], [1, 0, 1, 0, 0, 0], [1, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0], [1, 0, 0, 1, 0, 1], [1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1]]))
