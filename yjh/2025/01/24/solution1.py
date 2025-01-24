# https://school.programmers.co.kr/learn/courses/30/lessons/84512

def find(data, p, step):
    if step == 6:
        return
    if p != '':
        data.append(p)
    for c in ['A', 'E', 'I', 'O', 'U']:
        find(data, ''.join([p, c]), step + 1)

def solution(word):
    answer = 0
    data = []
    find(data, '', 0)
    for i in range(len(data)):
        if data[i] == word:
            answer = i + 1
            break
    print(data)
    return answer

print(solution("EIO"))
