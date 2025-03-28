# https://school.programmers.co.kr/learn/courses/30/lessons/152996

def solution(weights):
    answer = 0
    weight_dict = {}

    for i in weights:
        weight_dict[i] = weight_dict.get(i, 0) + 1
        
    for i in weight_dict:
        cur_weight_cnt = weight_dict[i]
        if cur_weight_cnt > 1:
            answer += (cur_weight_cnt * (cur_weight_cnt - 1)) / 2
        if i * 2 in weight_dict:
            answer += cur_weight_cnt * weight_dict[2 * i]
        if i * 2 / 3 in weight_dict:
            answer += cur_weight_cnt * weight_dict[i * 2 / 3]
        if i * 3 / 4 in weight_dict:
            answer += cur_weight_cnt * weight_dict[i * 3 / 4]

    return int(answer)

print(solution([100,180,360,100,270]))
