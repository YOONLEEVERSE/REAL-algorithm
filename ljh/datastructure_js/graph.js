class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(v) {
    if (!this.adjList.has(v)) {
      this.adjList.set(v, []);
    }
  }

  addEdge(v, w) {
    this.addVertex(v);
    this.addVertex(w);
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
  }

  getNeighbors(v) {
    return this.adjList.get(v) || [];
  }

  bfs(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];

    visited.add(start);

    while (queue.length) {
      const v = queue.shift();
      result.push(v);

      for (const neighbor of this.getNeighbors(v)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  dfs(start, visited = new Set(), result = []) {
    if (!this.adjList.has(start)) return result;
    visited.add(start);
    result.push(start);

    for (const neighbor of this.getNeighbors(start)) {
      if (!visited.has(neighbor)) {
        this.dfs(neighbor, visited, result);
      }
    }
    return result;
  }
}
