# https://school.programmers.co.kr/learn/courses/30/lessons/72410

def solution(new_id):
    answer = ''
    c_history = ''
    for i, c in enumerate(new_id):
        if c.isupper():
            c = c.lower()
        elif not (c.islower() or c.isnumeric() or c == '-' or c == '_' or c == '.'):
            continue
        elif answer == '' and c == '.':
            continue

        if not (c == '.' and c_history == '.'):
            answer += c
            c_history = c

    id_len = len(answer)
    if id_len == 0:
        answer += 'a'

    if id_len > 15:
        answer = answer[:15]

    if answer[-1] == '.':
        answer = answer[:-1]

    last_c = answer[-1:]
    while len(answer) < 3:
        answer += last_c

    return answer

print(solution(	"z-+.^."))
print(solution("...!@BaT#*..y.abcdefghijklm"))