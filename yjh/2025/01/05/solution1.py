# https://school.programmers.co.kr/learn/courses/30/lessons/42578

from collections import defaultdict

def solution(clothes):
    category_dict = defaultdict(int)
    for item, category in clothes:
        category_dict[category] += 1

    answer = 1
    for category, cnt in category_dict.items():
        answer *= cnt + 1

    return answer - 1

print(solution([["yellow_hat", "headgear"], ["blue_sunglasses", "eyewear"], ["green_turban", "headgear"]]))