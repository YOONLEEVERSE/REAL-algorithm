# https://school.programmers.co.kr/learn/courses/30/lessons/42586

def solution(progresses, speeds):
    answer = []
    progress_cnt = len(progresses)
    cur_idx = 0
    while sum(answer) < progress_cnt:
        deploy_cnt = 0
        for i, progress in enumerate(progresses):
            if progress < 100:
                progresses[i] += speeds[i]
            if i == cur_idx and progresses[i] >= 100:
                deploy_cnt += 1
                cur_idx += 1

        if deploy_cnt > 0:
            answer.append(deploy_cnt)

    return answer

print(solution([93, 30, 55], [1, 30, 5]))