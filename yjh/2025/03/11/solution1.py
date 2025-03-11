# https://school.programmers.co.kr/learn/courses/30/lessons/178871

def solution(players, callings):
    order_dict = {key:i for i, key in enumerate(players)}
    for calling in callings:
        calling_idx = order_dict[calling]
        loser_idx = calling_idx - 1
        loser_name = players[loser_idx]
        players[calling_idx], players[loser_idx] = players[loser_idx], players[calling_idx]
        order_dict[calling] = loser_idx
        order_dict[loser_name] = calling_idx
    return players

print(solution(["mumu", "soe", "poe", "kai", "mine"], ["kai", "kai", "mine", "mine"]))
