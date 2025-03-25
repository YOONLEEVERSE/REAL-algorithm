# https://school.programmers.co.kr/learn/courses/30/lessons/154540

def solution(maps):
    answer = []
    visited = set()
    rows = len(maps)
    cols = len(maps[0])

    dir_row = [1, -1, 0, 0]
    dir_col = [0, 0, 1, -1]

    def bfs(start_row, start_col):
        q = [(start_row, start_col)]
        visited.add((start_row, start_col))
        total = int(maps[start_row][start_col])
        while q:
            cur_row, cur_col = q.pop(0)
            print(cur_row, cur_col)
            for i in range(4):
                next_row, next_col = cur_row + dir_row[i], cur_col + dir_col[i]
                if 0 <= next_row < rows and 0 <= next_col < cols and maps[next_row][next_col] != 'X' and (next_row, next_col) not in visited:
                    q.append((next_row, next_col))
                    visited.add((next_row, next_col))
                    total += int(maps[next_row][next_col])

        if total != 0:
            answer.append(total)

    for row in range(rows):
        for col in range(cols):
            if maps[row][col] != 'X' and (row, col) not in visited:
                print(row, col)
                bfs(row, col)

    if len(answer) == 0:
        answer.append(-1)
    else:
        answer.sort()

    return answer

print(solution(["X591X","X1X5X","X231X", "1XXX1"]))
