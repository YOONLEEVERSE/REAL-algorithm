# algo-log

알고리즘 문제 풀이 기록 반자동화 TUI 도구.

문제 파일 생성 → 풀이 → 커밋까지, 플랫폼 API로 제목·난이도·유형을 자동 조회해 기록합니다.

## 경로 제약

이 도구는 **반드시 `tools/algo-log/` 디렉토리에서 실행**해야 합니다.

`data/db.json`, `config.json`, 풀이 파일 경로(`../../{baseDir}/`) 모두 실행 파일 위치 기준 상대 경로로 계산되기 때문에, 바이너리를 다른 위치로 옮기면 동작하지 않습니다.

전역 등록이 필요하다면 **심볼릭 링크**를 사용하세요:
```bash
# macOS / Linux — 바이너리 위치 유지, 심볼릭 링크로 전역 등록
ln -s "$(pwd)/algo" /usr/local/bin/algo
```

## 설치

```bash
# 빌드
npm run build        # macOS/Linux
npm run build:win    # Windows (.exe)
npm run build:all    # 둘 다

# 실행 권한 부여 (macOS/Linux)
chmod +x ./algo
./algo --help
```

**Windows**
```
algo.exe --help
```

## 명령어

### `algo new`

플랫폼·번호·언어를 선택하면 파일명 규칙에 맞는 소스코드 파일을 생성합니다.

```
algo new
```

- 복습 문제는 자동으로 suffix가 붙습니다 (`pg_42586_1.js`)
- 별도 입력 파일이 필요하면 `_input` 파일도 함께 생성

### `algo commit`

변경된 파일을 감지해 문제 정보를 기록하고 Git 커밋합니다.

```
algo commit
```

- Programmers / LeetCode 문제는 API로 **제목·난이도·유형 자동 조회** (실패 시 수동 입력)
- `README.md`와 `data/db.json`을 함께 스테이징·커밋

### `algo --help`

```
algo --help
```

## 파일명 규칙

| 플랫폼 | 약어 | 예시 |
| :----: | :--: | :--- |
| 프로그래머스 | `pg` | `pg_42586.js` |
| LeetCode | `lc` | `lc_1.py` |
| 백준 | `bj` | `bj_1000.java` |

복습 파일은 `{약어}_{번호}_{횟수}.{언어}` 형식 (`pg_42586_1.js`).

## 설정 (config.json)

최초 실행 시 대화형 프롬프트로 자동 생성됩니다.

```json
{
  "username": "ljh",
  "baseDir": "ljh",
  "defaultPlatform": "programmers",
  "language": "js"
}
```

| 필드 | 설명 |
| :--- | :--- |
| `username` | 커밋 메시지 앞에 붙는 이름 |
| `baseDir` | 풀이 파일이 저장되는 디렉토리 (repo root 기준) |
| `defaultPlatform` | `new` 명령어의 기본 플랫폼 |
| `language` | `new` 명령어의 기본 언어 |

## 개발

```bash
bun run dev     # 실행
bun run watch   # watch 모드
bun test        # 테스트
bun run readme  # mock 데이터로 README 미리보기 생성
```
