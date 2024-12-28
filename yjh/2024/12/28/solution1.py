# https://school.programmers.co.kr/learn/courses/30/lessons/258712

def solution(friends, gifts):
    receive_history = {x: [] for x in friends}
    send_history = {x: [] for x in friends}
    score = {x: 0 for x in friends}
    for gift in gifts:
        sender, receiver = gift.split(" ")
        receive_history[receiver].append(sender)
        send_history[sender].append(receiver)
        score[sender] += 1
        score[receiver] -= 1

    result = {x: 0 for x in friends}

    for sender in friends:
        for receiver in friends:
            if sender == receiver:
                continue

            send_cnt = send_history[receiver].count(sender)
            receive_cnt = receive_history[receiver].count(sender)
            if send_cnt > receive_cnt:
                result[receiver] += 1
                continue

            send_cnt2 = send_history[sender].count(receiver)
            receive_cnt2 = receive_history[sender].count(receiver)
            if send_cnt2 > receive_cnt2:
                continue

            if score[sender] == score[receiver]:
                continue

            if score[sender] < score[receiver]:
                result[receiver] += 1

    return max(result.values())

print(solution(["muzi", "ryan", "frodo", "neo"], ["muzi frodo", "muzi frodo", "ryan muzi", "ryan muzi", "ryan muzi", "frodo muzi", "frodo ryan", "neo muzi"]))


