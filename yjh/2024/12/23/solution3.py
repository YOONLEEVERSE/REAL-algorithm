# https://school.programmers.co.kr/learn/courses/30/lessons/340211

def solution(points, routes):
    total_path = {}
    for route in routes:
        path = [(points[route[0] - 1][0], points[route[0] - 1][1])]
        for j in range(len(route) - 1):
            find_path(points[route[j] - 1][0], points[route[j] - 1][1], points[route[j+1] - 1][0], points[route[j+1] - 1][1], path)

        # print(path)
        i = 0
        for a in path:
            x = a[0]
            y = a[1]
            if total_path.get(f'{x}_{y}_{i}') is None:
                total_path[f'{x}_{y}_{i}'] = 1
            else:
                total_path[f'{x}_{y}_{i}'] = total_path[f'{x}_{y}_{i}'] + 1
            i += 1

    # print(total_path)
    answer = 0
    for key in total_path.keys():
        if total_path[key] > 1:
            answer += 1

    return answer


def find_path(start_r, start_c, end_r, end_c, path):
    r, c = start_r, start_c

    while not (r == end_r and c == end_c):

        if r > end_r:
            r -= 1
            path.append((r, c))
            continue
        elif r < end_r:
            r += 1
            path.append((r, c))
        elif c > end_c:
            c -= 1
            path.append((r, c))
        elif c < end_c:
            c += 1
            path.append((r, c))


print(solution([[3, 2], [6, 4], [4, 7], [1, 4]], [[4, 2], [1, 3], [4, 2], [4, 3]]))
print(solution([[2, 2], [2, 3], [2, 7], [6, 6], [5, 2]], [[2, 3, 4, 5], [1, 3, 4, 5]]))