# https://school.programmers.co.kr/learn/courses/30/lessons/42576

from collections import defaultdict

def solution(participant, completion):
    participant_dict = defaultdict(int)
    for person in participant:
        participant_dict[person] += 1
    for person in completion:
        participant_dict[person] -= 1
    return list(filter(lambda name : participant_dict[name] != 0, participant_dict))[0]

print(solution(["leo", "kiki", "eden"], ["eden", "kiki"]))