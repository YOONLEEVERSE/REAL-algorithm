# https://school.programmers.co.kr/learn/courses/30/lessons/250121

def get_type(name):
    if name == "code":
        return 0
    elif name == "date":
        return 1
    elif name == "maximum":
        return 2
    elif name == "remain":
        return 3

def solution(data, ext, val_ext, sort_by):
    answer = list(filter(lambda row: row[get_type(ext)] < val_ext, data))
    answer.sort(key=lambda row: row[get_type(sort_by)])
    return answer

print(solution([[1, 20300104, 100, 80], [2, 20300804, 847, 37], [3, 20300401, 10, 8]], "date", 20300501, "remain"))