# https://school.programmers.co.kr/learn/courses/30/lessons/64064

from itertools import product

def find_matching_words(words, pattern):
    matching_words = []
    for i, word in enumerate(words):
        if len(word) != len(pattern):
            continue
        skip = False
        for j, p in enumerate(pattern):
            if not (p == "*" or p == word[j]):
                skip = True
                break
        if not skip:
            matching_words.append(i)
    return matching_words

def solution(user_id, banned_id):
    matching_word = [[] for _ in banned_id]
    for i in range(len(banned_id)):
        matching_word[i] = find_matching_words(user_id, banned_id[i])
    return len(set([str(sorted(x)) for x in product(*matching_word) if len(set(x)) == len(banned_id)]))

print(solution(["frodo", "fradi", "crodo", "abc123", "frodoc"], ["fr*d*", "*rodo", "******", "******"]))