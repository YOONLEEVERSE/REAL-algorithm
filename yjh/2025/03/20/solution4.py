# https://school.programmers.co.kr/learn/courses/30/lessons/155651

from heapq import heappop, heappush

def get_minute(time_str):
    split_str = time_str.split(':')
    return int(split_str[0]) * 60 + int(split_str[1])

def solution(book_time):
    answer = 1

    book_times = [(get_minute(s), get_minute(e) + 10) for s, e in book_time]
    book_times.sort()

    heap = []
    for s, e in book_times:
        if not heap:
            heappush(heap, e)
            continue

        if heap[0] <= s:
            heappop(heap)
        else:
            answer += 1
        heappush(heap, e)

    return answer

print(solution([["15:00", "17:00"], ["16:40", "18:20"], ["14:20", "15:20"], ["14:10", "19:20"], ["18:20", "21:20"]]))
