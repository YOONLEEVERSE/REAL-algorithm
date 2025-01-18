# https://school.programmers.co.kr/learn/courses/30/lessons/64065

def solution(s):
    tuple_arr = []
    split_s = s[2:-2].split('},{')
    for arr in split_s:
        tuple_arr.append(arr.split(','))
    tuple_arr.sort(key=lambda x: len(x))
    answer = []
    for tup in tuple_arr:
        for val in tup:
            if int(val) not in answer:
                answer.append(int(val))
    return answer

print(solution("{{4,2,3},{3},{2,3,4,1},{2,3}}"))
