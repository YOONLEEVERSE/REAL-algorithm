# https://school.programmers.co.kr/learn/courses/30/lessons/340213

def solution(video_len, pos, op_start, op_end, commands):
    video_seconds = get_total_seconds(video_len)
    cur_seconds = get_total_seconds(pos)
    op_start_seconds = get_total_seconds(op_start)
    op_end_seconds = get_total_seconds(op_end)

    for command in commands:
        if op_start_seconds <= cur_seconds <= op_end_seconds:
            cur_seconds = op_end_seconds

        if command == "prev":
            cur_seconds -= 10
        if command == "next":
            cur_seconds += 10

        if cur_seconds < 0:
            cur_seconds = 0
        if cur_seconds > video_seconds:
            cur_seconds = video_seconds

    if op_start_seconds <= cur_seconds <= op_end_seconds:
        cur_seconds = op_end_seconds

    answer_seconds = str(cur_seconds % 60)
    answer_minutes = str(cur_seconds // 60)

    answer = f'{answer_minutes.rjust(2, "0")}:{answer_seconds.rjust(2, "0")}'

    return answer


def get_total_seconds(param):
    split_param = param.split(":")
    minute = int(split_param[0])
    seconds = int(split_param[1])
    return minute * 60 + seconds

print(solution("34:33", "13:00", "00:55", "02:55", ["next", "prev"]))
