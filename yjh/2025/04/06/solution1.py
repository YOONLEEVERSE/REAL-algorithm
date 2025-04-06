# https://school.programmers.co.kr/learn/courses/30/lessons/388353

def check(storage_map, remove_set, start_y, start_x):
    visited = set()
    visited.add((start_y, start_x))
    q = [(start_y, start_x)]
    dir_x = [-1, 1, 0, 0]
    dir_y = [0, 0, -1, 1]
    # print("check", start_y, start_x, remove_set)
    while q:
        cur_y, cur_x = q.pop(0)
        # print(cur_y, cur_x)
        if cur_y == 0 or cur_y == len(storage_map) - 1 or cur_x == 0 or cur_x == len(storage_map[0]) - 1:
            return True

        for i in range(4):
            temp_y, temp_x = cur_y + dir_y[i], cur_x + dir_x[i]
            # print("temp", temp_y, temp_x, visited, remove_set, (temp_y, temp_x) not in visited and (temp_y, temp_x) in remove_set)
            if (temp_y, temp_x) not in visited and (temp_y, temp_x) in remove_set:
                visited.add((temp_y, temp_x))
                q.append((temp_y, temp_x))

    return False

def solution(storage, requests):
    storage_map = [[e for e in line] for line in storage]
    removed_set = set()
    answer = 0
    storage_len = len(storage)
    for request in requests:
        cur_removed_set = set()
        is_crane = len(request) == 2
        target = request[0]
        if is_crane:
            for y, line in enumerate(storage_map):
                for x, e in enumerate(line):
                    if (y, x) in removed_set or e != target:
                        continue
                    removed_set.add((y, x))
                    cur_removed_set.add((y, x))
                    answer += 1
                    # print(y, x, e)
        else:
            for y, line in enumerate(storage_map):
                for x, e in enumerate(line):
                    if (y, x) in removed_set or e != target:
                        continue
                    if y == 0 or y == storage_len - 1 or x == 0 or x == len(line) - 1:
                        removed_set.add((y, x))
                        cur_removed_set.add((y, x))
                        answer += 1
                        # print(y, x, e)
                    elif check(storage_map, removed_set.difference(cur_removed_set), y, x):
                        removed_set.add((y, x))
                        cur_removed_set.add((y, x))
                        answer += 1
                        # print(y, x, e)

    return storage_len * len(storage[0]) - answer

print(solution(["AZWQY", "CAABX", "BBDDA", "ACACA"], ["A", "BB", "A"]))