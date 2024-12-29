import math


N= int(input())
sizes= map(int, input().split())
[T,P] = map(int, input().split())

def getTshirtsNum(T,sizes):
    result = 0
    for size in sizes:
        result += math.ceil(size/T)
    return result

def getPenNum(P, N):
    return (N//P, N%P)

print(getTshirtsNum(T,sizes))
print("%d %d"%(getPenNum(P,N)))