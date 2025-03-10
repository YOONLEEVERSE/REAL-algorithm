# https://school.programmers.co.kr/learn/courses/30/lessons/133502

def solution(ingredient):
    answer = 0
    ingredients = []
    for i in ingredient:
        ingredients.append(i)
        if ingredients[-4:] == [1, 2, 3, 1]:
            answer += 1
            for _ in range(4):
                ingredients.pop()
    return answer

print(solution([2, 1, 1, 2, 3, 1, 2, 3, 1]))
