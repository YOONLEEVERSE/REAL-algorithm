# https://school.programmers.co.kr/learn/courses/30/lessons/12981

import math

def solution(n, words):
    history = set()
    for i, word in enumerate(words):
        if len(word) <= 1:
            return [i % n + 1, math.ceil((i + 1) / n)]

        if i > 0:
            if words[i - 1][-1] != word[0]:
                return [i % n + 1, math.ceil((i + 1) / n)]

            if word in history:
                return [i % n + 1, math.ceil((i + 1) / n)]

        history.add(word)

    return [0, 0]

print(solution(5, ["hello", "observe", "effect", "take", "either", "recognize", "encourage", "ensure", "establish", "hang", "gather", "refer", "reference", "estimate", "executive"]))