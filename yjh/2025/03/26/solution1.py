# https://school.programmers.co.kr/learn/courses/30/lessons/12978?language=python3

import heapq

def dijkstra(dist, adj):
    heap = []
    heapq.heappush(heap, [0, 1])
    while heap:
        cost, node = heapq.heappop(heap)
        for n, c in adj[node]:
            if cost + c < dist[n]:
                dist[n] = cost + c
                heapq.heappush(heap, [cost + c, n])


def solution(N, road, K):
    dist = [float('inf')] * (N + 1)
    dist[1] = 0
    adj = [[] for _ in range(N + 1)]
    for a, b, cost in road:
        adj[a].append([b, cost])
        adj[b].append([a, cost])
    dijkstra(dist, adj)
    return len([i for i in dist if i <= K])

print(solution(6, [[1,2,1],[1,3,2],[2,3,2],[3,4,3],[3,5,2],[3,5,3],[5,6,1]], 4))