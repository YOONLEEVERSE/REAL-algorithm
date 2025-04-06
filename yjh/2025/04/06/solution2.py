# https://school.programmers.co.kr/learn/courses/30/lessons/388354

def solution(nodes, edges):
    parents = []
    degrees = []
    root_groups = []
    non_root_groups = []
    nodes_idx = {}

    def find_parent(node_idx):
        if parents[node_idx] != node_idx:
            parents[node_idx] = find_parent(parents[node_idx])
        return parents[node_idx]

    def union_parent(a, b):
        a = find_parent(a)
        b = find_parent(b)
        if a != b:
            parents[b] = a

    for i, node in enumerate(nodes):
        parents.append(i)
        degrees.append(0)
        root_groups.append(0)
        non_root_groups.append(0)
        nodes_idx[node] = i

    for edge in edges:
        u = nodes_idx[edge[0]]
        v = nodes_idx[edge[1]]
        degrees[u] += 1
        degrees[v] += 1

    for edge in edges:
        u = nodes_idx[edge[0]]
        v = nodes_idx[edge[1]]
        union_parent(u, v)

    for i in range(len(nodes)):
        parent = find_parent(i)
        if nodes[i] % 2 == degrees[i] % 2:
            root_groups[parent] += 1
        else:
            non_root_groups[parent] += 1

    normal, reverse = 0, 0
    for i in range(len(nodes)):
        if find_parent(i) != i:
            continue
        if root_groups[i] == 1:
            normal += 1
        if non_root_groups[i] == 1:
            reverse += 1

    return normal, reverse

print(solution([11, 9, 3, 2, 4, 6], [[9, 11], [2, 3], [6, 3], [3, 4]]))
print(solution([9, 15, 14, 7, 6, 1, 2, 4, 5, 11, 8, 10], [[5, 14], [1, 4], [9, 11], [2, 15], [2, 5], [9, 7], [8, 1], [6, 4]]))