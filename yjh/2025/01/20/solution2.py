# https://school.programmers.co.kr/learn/courses/30/lessons/60057

def solution(s):
    answer = len(s)
    for x in range(1, len(s) // 2 + 1):
        size = 0
        dup_c = ''
        cnt = 1
        for i in range(0, len(s) + 1, x):
            temp = s[i: i+x]
            if dup_c == temp:
                cnt += 1
            else:
                size += len(temp)
                if cnt > 1:
                    size += len(str(cnt))
                cnt = 1
                dup_c = temp
        answer = min(answer, size)
    return answer

print(solution("abcabcabcabcdededededede"))