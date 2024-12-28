# https://school.programmers.co.kr/learn/courses/30/lessons/258709

from itertools import combinations, product
from bisect import bisect_left

def solution(dice: list):
    largest_wins = 0
    answer_dices = []
    dice_size = len(dice)
    origin_indices = set(range(dice_size))

    for indices in list(combinations(range(dice_size), dice_size // 2)):
        a_dices, b_dices = ([dice[index] for index in indices], [dice[index] for index in origin_indices - set(indices)])
        a_sums = [sum(p) for p in product(*a_dices)]
        b_sums = sorted([sum(p) for p in product(*b_dices)])
        wins = sum([bisect_left(b_sums, a_sum) for a_sum in a_sums])
        if largest_wins < wins:
            largest_wins = wins
            answer_dices = a_dices

    return [dice.index(answer_dice) + 1 for answer_dice in answer_dices]

print(solution([[40, 41, 42, 43, 44, 45], [43, 43, 42, 42, 41, 41], [1, 1, 80, 80, 80, 80], [70, 70, 1, 1, 70, 70]]))