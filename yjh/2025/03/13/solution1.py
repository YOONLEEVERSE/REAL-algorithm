# https://school.programmers.co.kr/learn/courses/30/lessons/131701

def get_elements(elements, i, cnt):
    len_e = len(elements)
    if i + cnt > len_e:
        return elements[i:min(i+cnt, len_e)] + elements[0:((i + cnt) % len_e)]
    else:
        return elements[i:i+cnt]

def solution(elements):
    len_e = len(elements)
    sum_set = set()
    for cnt in range(1, len_e + 1):
        for i, e in enumerate(elements):
            sum_set.add(sum(get_elements(elements, i, cnt)))
    return len(sum_set)

print(solution([7,9,1,1,4]))
