import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useNavigate } from "react-router";
import areaData from "../../lib/json/areaData.json";
import { popularArea } from "../../lib/api/home";

const SearchWrapper = styled.div`
  width: 100%;
  height: 65px;
  margin: 80px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 3px solid ${palette.cyan[5]};
  border-radius: 6px;
  .location-area,
  .tag-area,
  .search-btn {
    height: 65px;
  }
  .location-area,
  .tag-area {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 20px;
    input {
      width: 100%;
      font-size: 20px;
      margin-left: 10px;
    }
    ul {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      // margin-top: 1px;
      background-color: ${palette.gray[0]};
      border: 1px solid ${palette.gray[4]};
      z-index: 8888;
      h4 {
        padding: 10px 20px;
        font-size: 16px;
        background-color: ${palette.cyan[5]};
        color: white;
        margin: 0;
      }
      li {
        padding: 15px 20px;
        cursor: pointer;
        transition: 0.1s;
      }
      li:not(.last) {
        border-bottom: 1px solid ${palette.gray[4]};
      }
      li:hover {
        background-color: ${palette.gray[3]};
      }
    }
  }
  .location-area {
    width: 40%;
    padding: 0 20px;
    border-right: 1px solid ${palette.gray[5]};
  }
  .tag-area {
    width: 53%;
    padding: 0 20px;
  }
  .search-btn {
    width: 7%;
    text-align: center;
    line-height: 100%;
    background-color: ${palette.cyan[5]};
    color: white;
    border-radius: 0 6px 6px 0;
    font-size: 20px;
    transform: translateX(1px);
  }
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    width: 100%;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 200px;
    display: block;
    .location-area,
    .tag-area,
    .search-btn {
      width: 101%;
      padding: 10px 20px;
      font-size: 18px;
      transform: translateX(-1.5px);
      border-radius: 0 0 6px 6px;
      input {
        font-size: 18px;
      }
    }
    .location-area {
      border-right: none;
      border-bottom: 1px solid ${palette.gray[5]};
    }
  }
`;

export const SearchBottom = styled.div`
  // + 80px
  height: 200px;
  // Mobile
  @media screen and (max-width: 767px) {
    height: 264px;
  }
`;

let timer: NodeJS.Timeout | null = null;

const Search = () => {
  const navigate = useNavigate();

  const [popularLocation, setPopularLocation] = useState<any[]>([]);
  const [inputLocation, seInputLocation] = useState("");

  const refLocationArea = useRef<HTMLUListElement>(null);
  const refLocationInput = useRef<HTMLInputElement>(null);
  const refTagInput = useRef<HTMLInputElement>(null);

  const onFocusLocationArea = () => {
    if (!refLocationArea.current) return;
    refLocationArea.current.style.display = "block";
  };
  const onBlurLocationArea = () => {
    setTimeout(() => {
      if (!refLocationArea.current) return;
      refLocationArea.current.style.display = "none";
    }, 200);
  };

  const onClickLocationList = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      if (!refLocationInput.current) return;
      //@ts-ignore
      refLocationInput.current.value = e.target.innerHTML;
    },
    []
  );

  const onInputLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      seInputLocation(e.target.value);

      // TODO: 지역명 검색 API 호출
    }, 200);
  };

  const onSearch = () => {
    const keywordLocation = refLocationInput.current?.value;
    const keywordTag = refTagInput.current?.value;

    // TODO: 페이지 전환. 전환된 페이지에서 API 호출
    /*
      [검색API 쿼리 항목]
      키워드 (장소, 카테고리(기볼만한 곳, 맛집, 숙소), 해시태그)
      정렬기준 (최신순, 인기순, 오래된순)
      가져올 아이템 갯수 (limit) = 16
      몇번째 데이터부터 받을건지 (from)
    */
    navigate(`/search?location=${keywordLocation}&tag=${keywordTag}`);
  };

  useEffect(() => {
    // API 호출
    popularArea()
      .then(({ list }) => {
        setPopularLocation(list);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <>
      <SearchWrapper>
        <div
          className="location-area"
          onFocus={onFocusLocationArea}
          onBlur={onBlurLocationArea}
        >
          <span className="material-icons">pin_drop</span>
          <input
            type="text"
            name="location"
            placeholder="어디에서"
            ref={refLocationInput}
            onChange={onInputLocation}
          />
          {inputLocation ? (
            <ul
              ref={refLocationArea}
              style={{ maxHeight: "500px", overflow: "scroll" }}
            >
              {areaData.areaList
                .filter((area) => {
                  if (inputLocation === "") {
                    return area;
                  } else if (
                    area.toLowerCase().includes(inputLocation.toLowerCase())
                  ) {
                    return area;
                  }
                })
                .map((area) => (
                  <li key={area} onClick={onClickLocationList}>
                    {area}
                  </li>
                ))}
            </ul>
          ) : (
            <ul ref={refLocationArea}>
              <h4>인기 여행지 TOP7</h4>
              {popularLocation.map((item) => (
                <li key={item.id} onClick={onClickLocationList}>
                  {item.areaName}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="tag-area">
          <span className="material-icons">sms</span>
          <input
            type="text"
            name="tag"
            placeholder="무엇을 하고 싶으세요?"
            ref={refTagInput}
          />
        </div>
        <button type="submit" className="search-btn" onClick={onSearch}>
          <span className="material-icons">search</span>
        </button>
      </SearchWrapper>
    </>
  );
};

export default Search;
