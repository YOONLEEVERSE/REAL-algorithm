/*10시에 시작

도시 이름 검색 -> 관련 맛집 게시물 읽기 
prob : 읽기 성능이 좋지 않음
solv : 캐시 적용. 근데 적절한 캐시 사이즈를 모르겠는 상황

DB 캐시 크기에 따른 실행시간 측정

cacheSize. 0~30
cities: 10^5 (NlogN까지 성립) - 영문자/대소문자 구분X

캐시 교체 알고리즘 : LRU : 제일 오래전에 사용한 애를 빼고, 새 애를 넣는다. 
cache hit : 1, cache miss : 5초 
*/
function solution(cacheSize, cities) {
  var answer = 0;

  const CACHING_RESULT = {
    hit: "hit",
    miss: "miss",
  };

  const CACHE_SPEND_TIME = {
    [CACHING_RESULT.hit]: 1,
    [CACHING_RESULT.miss]: 5,
  };

  const cache = new Set();

  const isCacheFull = () => {
    return cache.size >= cacheSize;
  };

  const caching = (city) => {
    if (cacheSize === 0) return CACHING_RESULT.miss;

    if (cache.has(city)) {
      cache.delete(city);
      cache.add(city); //사용 순서 최신화

      return CACHING_RESULT.hit;
    }

    // miss
    // 캐시가 다 차서 LRU 알고리즘으로 교체
    if (isCacheFull()) {
      const lruCity = cache.values().next().value;

      cache.delete(lruCity);
    }

    cache.add(city);

    return CACHING_RESULT.miss;
  };

  for (let city of cities) {
    const cityLowerCase = city.toLowerCase();

    //console.log(`${city}의 cache결과는? ${cacheResult}`)
    // console.log("CACHE : ",cache,cacheHitCnt);

    answer += CACHE_SPEND_TIME[caching(cityLowerCase)];
  }

  return answer;
}
