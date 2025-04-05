# https://school.programmers.co.kr/learn/courses/30/lessons/388351

def solution(schedules, timelogs, startday):
    answer = 0
    for i, schedule in enumerate(schedules):
        hour, minute = schedule // 100, schedule % 100
        minute += 10
        if minute >= 60:
            hour += 1
            minute -= 60
        limit = hour * 100 + minute
        is_pass = True
        for j, timelog in enumerate(timelogs[i]):
            cur_day = (startday + j) % 7
            if not (cur_day == 0 or cur_day == 6) and timelog > limit:
                is_pass = False
                break
        if is_pass:
            answer += 1
    return answer

print(solution([700, 800, 1100], [[710, 2359, 1050, 700, 650, 631, 659], [800, 801, 805, 800, 759, 810, 809], [1105, 1001, 1002, 600, 1059, 1001, 1100]], 5))
