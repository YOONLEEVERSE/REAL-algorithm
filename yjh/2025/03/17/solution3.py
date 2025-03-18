# https://school.programmers.co.kr/learn/courses/30/lessons/43165

def solution(numbers, target):
    all_ways = []

    def recur(numbers, current_index, current_sum):
        if current_index == len(numbers):
            all_ways.append(current_sum)
            return

        recur(numbers, current_index + 1, current_sum + numbers[current_index])
        recur(numbers, current_index + 1, current_sum - numbers[current_index])

    recur(numbers, 0, 0)
    target_count = 0

    for way in all_ways:
        if target == way:
            target_count += 1

    return target_count

print(solution([1, 1, 1, 1, 1], 3))
