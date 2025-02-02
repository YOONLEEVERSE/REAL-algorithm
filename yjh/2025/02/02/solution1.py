# https://school.programmers.co.kr/learn/courses/30/lessons/68644

def solution(numbers):
    answer = set()
    for i, num in enumerate(numbers):
        for j, num2 in enumerate(numbers[i+1:]):
            answer.add(num + num2)
    return sorted(list(answer))

print(solution([2,1,3,4,1]))