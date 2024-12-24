# https://school.programmers.co.kr/learn/courses/30/lessons/250137

def solution(bandage, health, attacks):
    t, x, y = bandage
    max_health = health

    attacks_dict = {x[0]: x[1] for x in attacks}

    time = 0
    success_cnt = 0
    while len(attacks_dict) > 0:
        time += 1
        attack = attacks_dict.get(time)
        if attack is None:
            success_cnt += 1
            health = min(max_health, health + x)
            if success_cnt == t:
                success_cnt = 0
                health = min(max_health, health + y)
        else:
            success_cnt = 0
            attacks_dict.pop(time)
            health = max(-1, health - attack)
            if health <= 0:
                health = -1
                break

    return health

print(solution([5, 1, 5], 30, [[2, 10], [9, 15], [10, 5], [11, 5]]))