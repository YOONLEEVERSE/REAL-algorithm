# https://school.programmers.co.kr/learn/courses/30/lessons/92341

from collections import defaultdict

def solution(fees, records):
    answer = []
    history = defaultdict(dict)
    time_history = {}
    for record in records:
        split_record = record.split()
        record_time, car_number, in_out = split_record[0], split_record[1], split_record[2]
        split_time = record_time.split(':')
        record_minute = int(split_time[0]) * 60 + int(split_time[1])
        history[car_number][in_out] = record_minute
        if 'IN' in history[car_number] and 'OUT' in history[car_number]:
            time_history[car_number] = time_history.get(car_number, 0) + (history[car_number]['OUT'] - history[car_number]['IN'])
            history.pop(car_number)
    for car_number in history:
        time_history[car_number] = time_history.get(car_number, 0) + ((23 * 60 + 59) - history[car_number]['IN'])
    car_nums = sorted(list(time_history.keys()))
    for car_num in car_nums:
        price = 0
        stack_time = time_history[car_num]
        stack_time -= fees[0]
        price += fees[1]
        if stack_time > 0:
            price += stack_time // fees[2] * fees[3]
            if stack_time % fees[2] > 0:
                price += fees[3]
        answer.append(price)
    return answer

print(solution([180, 5000, 10, 600], ["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]))