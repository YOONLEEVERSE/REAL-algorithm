# https://school.programmers.co.kr/learn/courses/30/lessons/92334

from collections import defaultdict

def solution(id_list, report, k):
    answer = []
    history = defaultdict(list)
    report_cnt = {}
    for r in report:
        split_r = r.split(' ')
        f, t = split_r[0], split_r[1]
        if t not in history[f]:
            report_cnt[t] = report_cnt.get(t, 0) + 1
        history[f].append(t)

    for id_ in id_list:
        answer_cnt = 0
        for t in history[id_]:
            if report_cnt.get(t, 0) >= k:
                answer_cnt += 1
        answer.append(answer_cnt)
    return answer

print(solution(["muzi", "frodo", "apeach", "neo"], ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"], 2))
