# https://school.programmers.co.kr/learn/courses/30/lessons/87377

def solution(line):
    n = len(line)
    min_x, max_x, min_y, max_y = int(1e15), -int(1e15), int(1e15), -int(1e15)
    points = []
    for first in range(n):
        a, b, e = line[first]
        for second in range(first + 1, n):
            c, d, f = line[second]
            if a * d == b * c:
                continue

            x = (b * f - e * d) / (a * d - b * c)
            y = (e * c - a * f) / (a * d - b * c)

            if int(x) != x or int(y) != y:
                continue

            points.append((int(x), int(y)))
            min_x, max_x, min_y, max_y \
                = min(min_x, int(x)), max(max_x, int(x)), min(min_y, int(y)), max(max_y, int(y))

    x_len = max_x - min_x + 1
    y_len = max_y - min_y + 1
    temp = [["."] * x_len for _ in range(y_len)]
    for x, y in points:
        temp[y + (0 - min_y)][x + (0 - min_x)] = "*"

    answer = []
    for result in temp:
        answer.append("".join(result))

    return answer[::-1]

print(solution([[2, -1, 4], [-2, -1, 4], [0, -1, 1], [5, -8, -12], [5, 8, 12]]))