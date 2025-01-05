# https://school.programmers.co.kr/learn/courses/30/lessons/42579

from collections import defaultdict

def get_total_play(songs):
    return sum([x[1] for x in songs])

def solution(genres, plays):
    music_dict = defaultdict(list)

    song_id = 0
    for genre, play in zip(genres, plays):
        music_dict[genre].append((song_id, play))
        song_id += 1

    sorted_music_dict = sorted(music_dict.items(), key=lambda x: get_total_play(x[1]), reverse=True)

    answer = []
    for _, songs in sorted_music_dict:
        sorted_songs = sorted(songs, key=lambda x: x[1], reverse=True)
        answer.extend([x[0] for x in sorted_songs[0: min(len(songs), 2)]])

    return answer

print(solution(["classic", "pop", "classic", "classic", "pop"], [500, 600, 150, 800, 2500]))