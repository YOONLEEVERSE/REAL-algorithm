# https://school.programmers.co.kr/learn/courses/30/lessons/12951

def solution(s):
    words = s.split(" ")
    result = []
    for word in words:
        result.append(word.capitalize())
    return ' '.join(result)

print(solution("for the last week"))