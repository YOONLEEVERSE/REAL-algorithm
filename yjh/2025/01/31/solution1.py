# https://school.programmers.co.kr/learn/courses/30/lessons/42840

def get_answer_cnt(order, answers):
    order_size = len(order)
    return len(list(filter(lambda x:order[x[0] % order_size] == x[1], enumerate(answers))))

def solution(answers):
    orders = [[1, 2, 3, 4, 5], [2, 1, 2, 3, 2, 4, 2, 5], [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]]
    answer_cnt_arr = {}
    for i, order in enumerate(orders):
        answer_cnt_arr[i] = get_answer_cnt(order, answers)
    max_cnt = max(answer_cnt_arr.values())
    return [i + 1 for i, answer_cnt in answer_cnt_arr.items() if answer_cnt == max_cnt]

print(solution([1,2,3,4,5]))