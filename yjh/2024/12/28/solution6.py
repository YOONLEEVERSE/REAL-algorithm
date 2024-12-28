# https://school.programmers.co.kr/learn/courses/30/lessons/42888

def solution(record):
    name_dict = {}
    history = []
    for row in record:
        split_row = row.split(' ')

        if len(split_row) == 2:
            command, uid = split_row
        else:
            command, uid, name = split_row

        if command == "Enter":
            name_dict[uid] = name
            history.append((1, uid))
        elif command == "Change":
            name_dict[uid] = name
        elif command == "Leave":
            history.append((0, uid))

    answer = []
    for row in history:
        command, uid = row
        if command == 1:
            answer.append(f'{name_dict[uid]}님이 들어왔습니다.')
        elif command == 0:
            answer.append(f'{name_dict[uid]}님이 나갔습니다.')

    return answer

print(solution(["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"]))