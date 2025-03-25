# https://school.programmers.co.kr/learn/courses/30/lessons/86971

def solution(n, wires):
    answer = n
    wire_len = len(wires)

    def bfs(start, graph, visited):
        q = [start]
        visited.add(start)

        while q:
            cur = q.pop(0)
            for i in graph[cur]:
                if i not in visited:
                    q.append(i)
                    visited.add(i)

    for i in range(wire_len):
        visited = set()
        new_wires = wires[0:i] + wires[i+1:wire_len]
        graph = [[] for _ in range(n + 1)]
        for wire in new_wires:
            x, y = wire
            graph[x].append(y)
            graph[y].append(x)
        bfs(new_wires[0][0], graph, visited)
        answer = min(answer, abs(n - len(visited) - len(visited)))

    return answer

print(solution(9, [[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]]))
