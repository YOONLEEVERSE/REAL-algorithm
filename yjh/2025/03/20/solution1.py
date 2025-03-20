# https://school.programmers.co.kr/learn/courses/30/lessons/68936

def solution(arr):
    answer = [0, 0]

    def compression(start_row, strat_col, temp_len):
        start_val = arr[start_row][strat_col]
        for row in range(start_row, start_row + temp_len):
            for col in range(strat_col, strat_col + temp_len):
                if arr[row][col] != start_val:
                    temp_len //= 2
                    compression(start_row, strat_col, temp_len)
                    compression(start_row, strat_col + temp_len, temp_len)
                    compression(start_row + temp_len, strat_col, temp_len)
                    compression(start_row + temp_len, strat_col + temp_len, temp_len)
                    return

        answer[start_val] += 1

    compression(0, 0, len(arr))
    return answer

print(solution([[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1],[0,0,0,0,1,1,1,1],[0,1,0,0,1,1,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,1],[0,0,0,0,1,0,0,1],[0,0,0,0,1,1,1,1]]))
