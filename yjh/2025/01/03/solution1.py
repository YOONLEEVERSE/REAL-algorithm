# https://school.programmers.co.kr/learn/courses/30/lessons/250125

def solution(board, h, w):
    n = len(board)

    dir_h = [1, -1, 0, 0]
    dir_w = [0, 0, 1, -1]

    answer = 0
    for i in range(4):
        cur_h = h + dir_h[i]
        cur_w = w + dir_w[i]
        if 0 <= cur_h < n and 0 <= cur_w < n:
            if board[h][w] == board[cur_h][cur_w]:
                answer += 1

    return answer

print(solution([["blue", "red", "orange", "red"], ["red", "red", "blue", "orange"], ["blue", "orange", "red", "red"], ["orange", "orange", "red", "blue"]], 1, 1))