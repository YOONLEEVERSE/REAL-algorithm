# https://school.programmers.co.kr/learn/courses/30/lessons/64063

import sys
sys.setrecursionlimit(2000)

def find_empty_room(room, rooms):
    if room not in rooms:
        rooms[room] = room + 1
        return room
    empty = find_empty_room(rooms[room], rooms)
    rooms[room] = empty + 1
    return empty

def solution(k, room_number):
    rooms = {}
    for room in room_number:
        find_empty_room(room, rooms)

    return list(rooms)

print(solution(10, [1,3,4,1,3,1]))
