# algo-log

알고리즘 문제 풀이 기록 반자동화 TUI 도구.

문제 파일 생성 → 풀이 → 커밋까지, 플랫폼 API로 제목·난이도·유형을 자동 조회해 기록합니다.

## 설치

빌드된 실행 파일(`algo`, `algo.exe`)이 포함되어 있습니다.

**macOS / Linux**
```bash
chmod +x ./algo
./algo --help

# 전역 등록 (선택)
npm link
```

**Windows**
```
algo.exe --help
```

빌드가 필요한 경우:
```bash
npm run build        # macOS/Linux
npm run build:win    # Windows (.exe)
npm run build:all    # 둘 다
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
