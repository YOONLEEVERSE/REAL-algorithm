# https://school.programmers.co.kr/learn/courses/30/lessons/42583

from collections import defaultdict

def solution(bridge_length, weight, truck_weights):
    bridge_dict = defaultdict(list)
    cur_time = 1
    for time in range(cur_time, cur_time + bridge_length):
        bridge_dict[time].append(truck_weights[0])
    cur_time += 1
    for truck_weight in truck_weights[1:]:
        while cur_time in bridge_dict and sum(bridge_dict[cur_time]) + truck_weight > weight:
            cur_time += 1
        for time in range(cur_time, cur_time + bridge_length):
            bridge_dict[time].append(truck_weight)
        cur_time += 1
    return max(bridge_dict.keys()) + 1

print(solution(2, 10, [7,4,5,6]))
print(solution(	100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]))
