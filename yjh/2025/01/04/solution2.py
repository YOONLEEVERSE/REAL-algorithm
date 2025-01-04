# https://school.programmers.co.kr/learn/courses/30/lessons/42577

def solution(phone_book):
    phone_book.sort()
    for i, phone in enumerate(phone_book[:-1]):
        if phone_book[i + 1].startswith(phone):
            return False

    return True

print(solution(["119", "97674223", "1195524421"]))