# https://school.programmers.co.kr/learn/courses/30/lessons/77485

def solution(rows, columns, queries):
    matrix = [[ y * columns + x + 1 for x in range(columns)] for y in range(rows)]
    answer = []

    for query in queries:
        x1, y1, x2, y2 = query
        cur_x, cur_y = x1, y1
        prev_value = matrix[cur_x - 1][cur_y - 1]
        min_value = int(1e15)
        while True:
            if cur_x == x1 and cur_y < y2:
                cur_y += 1
            elif cur_y == y2 and cur_x < x2:
                cur_x += 1
            elif cur_x == x2 and cur_y > y1:
                cur_y -= 1
            elif cur_y == y1 and cur_x > x1:
                cur_x -= 1
            temp = matrix[cur_x - 1][cur_y - 1]
            matrix[cur_x - 1][cur_y - 1] = prev_value
            prev_value = temp
            min_value = min(min_value, prev_value)
            if cur_x == x1 and cur_y == y1:
                break
        answer.append(min_value)

    return answer

print(solution(6, 6, [[2,2,5,4],[3,3,6,6],[5,1,6,3]]))