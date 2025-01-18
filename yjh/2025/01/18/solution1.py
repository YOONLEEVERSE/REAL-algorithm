# https://school.programmers.co.kr/learn/courses/30/lessons/81302

def solution(places):
    answer = []
    for place in places:
        if check_position(place) == 0:
            answer.append(0)
        else:
            answer.append(1)

    return answer

def check_position(place):
    for y in range(5):
        for x in range(5):
            if place[y][x] == 'P':
                if find_bad(place, x, y) == 0:
                    return 0

    return 1

def find_bad(place, base_x, base_y):
    visited = []
    s = [(base_x, base_y)]
    visited.append((base_x, base_y))
    while s:
        x, y = s.pop()
        if 0 < abs(base_y - y) + abs(base_x - x) and place[y][x] == 'P':
            return 0

        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            cur_x, cur_y = x + dx, y + dy
            if 0 <= cur_x < 5 and 0 <= cur_y < 5:
                if (place[cur_y][cur_x] == 'P' or place[cur_y][cur_x] == 'O') and (cur_x, cur_y) not in visited and abs(base_y - cur_y) + abs(base_x - cur_x) <= 2:
                    s.append((cur_x, cur_y))
                    visited.append((cur_x, cur_y))

    return 1

print(solution([["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]]))
