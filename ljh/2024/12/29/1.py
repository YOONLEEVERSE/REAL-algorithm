def solution(a, b, c):
    if(a== 0 | b==0|c==0):
        return 'wrong'
    asquare = a**2
    bsquare = b**2
    csquare = c**2

    if(csquare == asquare + bsquare):
        return 'right'
    return 'wrong'

while(True):
    _input = input().split()
    _input = list(map(int, _input))
    if(len(_input)!=3):
        break
    if(_input[0] == 0 and _input[1] == 0 and _input[2]==0):
        break
    _input.sort()
    [a,b,c] = _input
    print(solution(a,b,c))
