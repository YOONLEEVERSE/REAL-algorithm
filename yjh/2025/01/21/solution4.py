# https://school.programmers.co.kr/learn/courses/30/lessons/12918

def is_valid(s):
    len_s = len(s)
    if not (len_s == 4 or len_s == 6):
        return False
    try:
        int(s)
        return True
    except:
        return False

def solution(s):
    return is_valid(s)

print(solution("a234"))