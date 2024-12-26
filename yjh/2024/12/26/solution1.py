# https://school.programmers.co.kr/learn/courses/30/lessons/250135

def get_total_seconds(h, m, s):
    return h * 60 * 60 + m * 60 + s

def get_degree(type, sec):
    if type == "H":
        return sec % (12 * 60 * 60) / 120
    elif type == "M":
        return sec % (60 * 60) / 10
    elif type == "S":
        return sec % 60 * 6

def solution(h1, m1, s1, h2, m2, s2):
    start_time, end_time = get_total_seconds(h1, m1, s1), get_total_seconds(h2, m2, s2)
    temp_hour, temp_min, temp_sec = 0, 0, 0

    answer = 0
    while start_time <= end_time:
        h_degree = get_degree("H", start_time)
        m_degree = get_degree("M", start_time)
        s_degree = get_degree("S", start_time)

        if s_degree == 0:
            s_degree = 360
            if m_degree < 10:
                m_degree += 360
            if h_degree < 10:
                h_degree += 360

        if temp_sec - temp_hour < 0 < s_degree - h_degree:
            answer += 1
        if temp_sec - temp_min < 0 < s_degree - m_degree:
            answer += 1
        if s_degree == h_degree or s_degree == m_degree:
            answer += 1

        temp_hour = h_degree
        temp_min = m_degree
        temp_sec = s_degree

        start_time += 1

    return answer

print(solution(0, 0, 0, 23, 59, 59))