# https://school.programmers.co.kr/learn/courses/30/lessons/172928

def solution(park, routes):
    H, W = len(park), len(park[0])
    start = [(y, x) for y in range(len(park)) for x in range(len(park[y])) if park[y][x] == 'S'][0]
    cur_y, cur_x = start
    for route in routes:
        split_route = route.split(' ')
        direction, length = split_route[0], int(split_route[1])
        if direction == "N":
            for next_y in range(cur_y, cur_y - length - 1, -1):
                if next_y < 0 or park[next_y][cur_x] == 'X':
                    break
            else:
                if cur_y - length >= 0:
                    cur_y = cur_y - length
        elif direction == "S":
            for next_y in range(cur_y, cur_y + length + 1):
                if next_y >= H or park[next_y][cur_x] == 'X':
                    break
            else:
                if cur_y + length < H:
                    cur_y = cur_y + length
        elif direction == "E":
            for next_x in range(cur_x, cur_x + length + 1):
                if next_x >= W or park[cur_y][next_x] == 'X':
                    break
            else:
                if cur_x + length < W:
                    cur_x = cur_x + length
        else:
            for next_x in range(cur_x, cur_x - length - 1, -1):
                if next_x < 0 or park[cur_y][next_x] == 'X':
                    break
            else:
                if cur_x - length >= 0:
                    cur_x = cur_x - length

    return [cur_y, cur_x]

print(solution(["SOO","OOO","OOO"], ["E 2","S 2","W 1"]))
print(solution(["OSO","OOO","OXO","OOO"], ["E 2","S 3","W 1"]))