# https://school.programmers.co.kr/learn/courses/30/lessons/178870

def solution(sequence, k):
    answer = []
    start, end = 0, 0
    temp = sequence[0]
    min_len = 1000001
    sequence_len = len(sequence)

    while start <= end < sequence_len:
        if temp == k:
            if end - start + 1 < min_len:
                min_len = end - start + 1
                answer = [start, end]
            temp -= sequence[start]
            start += 1
        elif temp < k:
            end += 1
            if end < sequence_len:
                temp += sequence[end]
        elif temp > k:
            temp -= sequence[start]
            start += 1

    return answer

print(solution([1, 1, 1, 2, 3, 4, 5]))
