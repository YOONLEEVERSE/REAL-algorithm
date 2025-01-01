# https://school.programmers.co.kr/learn/courses/30/lessons/340199

def solution(wallet, bill):
    answer = 0
    while True:
        if not (min(bill) > min(wallet) or max(bill) > max(wallet)):
            break

        if bill[0] > bill[1]:
            bill[0] = bill[0] // 2
            answer += 1
        else:
            bill[1] = bill[1] // 2
            answer += 1

    return answer

print(solution([30, 15], [26, 17]))
print(solution([50, 50], [100, 241]))