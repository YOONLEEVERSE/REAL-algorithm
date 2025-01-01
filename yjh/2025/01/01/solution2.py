# https://school.programmers.co.kr/learn/courses/30/lessons/340198

def solution(mats, park):
    max_x = len(park[0])
    max_y = len(park)

    max_len = 0
    dp_map = [[1 if park[y][x] == "-1" else 0 for x in range(max_x)] for y in range(max_y)]
    for y in range(1, max_y):
        for x in range(1, max_x):
            if dp_map[y][x] == 0:
                continue

            dp_map[y][x] = min(dp_map[y - 1][x - 1], dp_map[y - 1][x], dp_map[y][x - 1]) + 1
            max_len = max(max_len, dp_map[y][x])

    mats.sort(reverse=True)
    for mat in mats:
        if max_len >= mat:
            return mat

    return -1


print(solution([5,3,2], [["A", "A", "-1", "B", "B", "B", "B", "-1"], ["A", "A", "-1", "B", "B", "B", "B", "-1"], ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"], ["D", "D", "-1", "-1", "-1", "-1", "E", "-1"], ["D", "D", "-1", "-1", "-1", "-1", "-1", "F"], ["D", "D", "-1", "-1", "-1", "-1", "E", "-1"]]))