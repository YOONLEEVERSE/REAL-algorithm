# https://school.programmers.co.kr/learn/courses/30/lessons/258711
from collections import defaultdict, deque

edge_out_list = defaultdict(list)
visited = set()

def find_shape(node):
    global edge_out_list, visited

    q = deque([node])

    while q:
        node = q.popleft()
        if node in visited:
            return 'donut'

        visited.add(node)

        next = edge_out_list[node]
        if len(next) == 0:
            return 'stick'
        if len(next) == 2:
            return 'eight'

        q.append(next[0])

def solution(edges):
    global edge_out_list

    edge_in = defaultdict(int)

    for f, t in edges:
        edge_out_list[f].append(t)
        edge_in[t] += 1

    root = [node for node in edge_out_list if edge_in[node] == 0 and len(edge_out_list[node]) >= 2][0]

    shape_list = { 'donut' : 0, 'stick' : 0, 'eight' : 0 }

    for node in edge_out_list[root]:
        shape = find_shape(node)
        shape_list[shape] = shape_list[shape] + 1

    return [root, shape_list['donut'], shape_list['stick'], shape_list['eight']]

print(solution([[4, 11], [1, 12], [8, 3], [12, 7], [4, 2], [7, 11], [4, 8], [9, 6], [10, 11], [6, 10], [3, 5], [11, 1], [5, 3], [11, 9], [3, 8]]))