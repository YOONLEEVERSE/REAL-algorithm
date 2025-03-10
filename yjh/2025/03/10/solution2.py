# https://school.programmers.co.kr/learn/courses/30/lessons/118666

def solution(survey, choices):
    scores = [0, -3, -2, -1, 0, 1, 2, 3]
    score_dict = {"R": 0, "T": 0, "C": 0, "F": 0, "J": 0, "M": 0, "A": 0, "N": 0}
    answer = ''
    for i, choice in enumerate(choices):
        if choice == 4:
            continue
        score = scores[choice]
        if score < 0:
            score_dict[survey[i][0]] += -score
        else:
            score_dict[survey[i][1]] += score

    for bundle in ["RT", "CF", "JM", "AN"]:
        if score_dict[bundle[0]] == score_dict[bundle[1]]:
            answer += bundle[0] if ord(bundle[0]) < ord(bundle[1]) else bundle[1]
        elif score_dict[bundle[0]] < score_dict[bundle[1]]:
            answer += bundle[1]
        else:
            answer += bundle[0]

    return answer

print(solution(["AN", "CF", "MJ", "RT", "NA"], [5, 3, 2, 7, 5]))
