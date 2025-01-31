# https://school.programmers.co.kr/learn/courses/30/lessons/42842

def solution(brown, yellow):
    for width in range(3, 5000):
        for height in range(3, width + 1):
            cur_brown = width * 2 + ((height - 2) * 2)
            cur_yellow = (width - 2) * (height - 2)
            if cur_brown == brown and cur_yellow == yellow:
                return [width, height]

    return [0, 0]

print(solution(10, 2))
print(solution(8, 1))
print(solution(24, 24))