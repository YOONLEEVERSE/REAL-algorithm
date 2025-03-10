# https://school.programmers.co.kr/learn/courses/30/lessons/150370

def solution(today, terms, privacies):
    answer = []
    split_today = today.split(".")
    today_year, today_month, today_day = int(split_today[0]), int(split_today[1]), int(split_today[2])
    term_dict = {term.split(" ")[0]: int(term.split(" ")[1]) for term in terms}

    for i, privacy in enumerate(privacies, start=1):
        split_privacy = privacy.split(" ")
        start, term = split_privacy[0], split_privacy[1]

        split_date = start.split(".")
        start_year, start_month, start_day = int(split_date[0]), int(split_date[1]), int(split_date[2])
        start_month += term_dict[term]

        while start_month > 12:
            start_year += 1
            start_month -= 12

        if today_year > start_year:
            answer.append(i)
        elif today_year == start_year:
            if today_month > start_month:
                answer.append(i)
            elif today_month == start_month and today_day >= start_day:
                answer.append(i)

    return answer

solution("2020.01.01", ["Z 3", "D 5"], ["2019.01.01 D", "2019.11.15 Z", "2019.08.02 D", "2019.07.01 D", "2018.12.28 Z"])
