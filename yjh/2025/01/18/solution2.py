# https://school.programmers.co.kr/learn/courses/30/lessons/12949

def solution(arr1, arr2):
    height = len(arr1)
    width = len(arr2[0])

    answer = [[0] * width for _ in range(height)]
    for y in range(height):
        for x in range(width):
            value = 0
            for i in range(len(arr2)):
                value += arr1[y][i] * arr2[i][x]
            answer[y][x] = value

    return answer

print(solution([[2, 3, 2], [4, 2, 4], [3, 1, 4]], [[5, 4, 3], [2, 4, 1], [3, 1, 1]]))
print(solution([[1, 4], [3, 2], [4, 1]], [[3, 3], [3, 3]]))