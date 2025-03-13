# https://school.programmers.co.kr/learn/courses/30/lessons/131127

def solution(want, number, discount):
    answer = 0
    all_case = len(discount) - 10
    for case in range(all_case + 1):
        target_discount = discount[case: case + 10]
        for i, num in enumerate(number):
            item = want[i]
            if target_discount.count(item) < num:
                break
        else:
            answer += 1

    return answer

print(solution(["banana", "apple", "rice", "pork", "pot"], [3, 2, 2, 2, 1], ["chicken", "apple", "apple", "banana", "rice", "apple", "pork", "banana", "pork", "rice", "pot", "banana", "apple", "banana"]))
