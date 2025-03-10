# https://school.programmers.co.kr/learn/courses/30/lessons/161990

def solution(wallpaper):
    answer = []
    pos_list = []

    x_len = len(wallpaper)
    y_len = len(wallpaper[0])

    for x in range(x_len):
        for y in range(y_len):
            if wallpaper[x][y] == "#":
                pos_list.append((x, y))

    x_list = [pos[0] for pos in pos_list]
    y_list = [pos[1] for pos in pos_list]

    min_x, max_x = min(x_list), max(x_list)
    min_y, max_y = min(y_list), max(y_list)

    return [min_x, min_y, max_x + 1, max_y + 1]

print(solution([".##...##.", "#..#.#..#", "#...#...#", ".#.....#.", "..#...#..", "...#.#...", "....#...."]))
