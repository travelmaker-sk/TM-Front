import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useNavigate } from "react-router";
import areaData from "../../lib/json/areaData.json";
import { popularArea } from "../../lib/api/home";

const SearchWrapper = styled.div`
  width: 100%;
  height: 65px;
  margin: 80px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 3px solid ${palette.cyan[5]};
  border-radius: 4px;
  .where-area,
  .what-area,
  .search-btn {
    height: 65px;
  }
  .where-area,
  .what-area {
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
      z-index: 1111;
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
  .where-area {
    width: 40%;
    padding: 0 20px;
    border-right: 1px solid ${palette.gray[5]};
  }
  .what-area {
    width: 53%;
    padding: 0 20px;
  }
  .search-btn {
    width: 7%;
    min-width: 70px;
    text-align: center;
    line-height: 100%;
    background-color: ${palette.cyan[5]};
    color: white;
    font-size: 20px;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    height: 200px;
    display: block;
    .where-area,
    .what-area,
    .search-btn {
      width: 100%;
      padding: 10px 20px;
      font-size: 18px;
      input {
        font-size: 18px;
      }
    }
    .where-area {
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

  const [popularWhere, setPopularWhere] = useState<any[]>([]);
  const [inputWhere, seInputWhere] = useState("");

  const refWhereArea = useRef<HTMLUListElement>(null);
  const refWhereInput = useRef<HTMLInputElement>(null);
  const refWhatInput = useRef<HTMLInputElement>(null);

  const onFocusWhereArea = () => {
    if (!refWhereArea.current) return;
    refWhereArea.current.style.display = "block";
  };
  const onBlurWhereArea = () => {
    setTimeout(() => {
      if (!refWhereArea.current) return;
      refWhereArea.current.style.display = "none";
    }, 130);
  };

  const onClickWhereList = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    if (!refWhereInput.current) return;
    //@ts-ignore
    refWhereInput.current.value = e.target.innerHTML;
    console.log(
      "input:",
      refWhereInput.current.value,
      "list:",
      //@ts-ignore
      e.target.innerHTML
    );
  }, []);

  const onInputWhere = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      seInputWhere(e.target.value);
      console.log("inputWhere: ", inputWhere);

      // TODO: 지역명 검색 API 호출
    }, 200);
  };

  const onSearch = () => {
    const keywordWhere = refWhereInput.current?.value;
    const keywordWhat = refWhatInput.current?.value;
    console.log("keywordWhere: ", keywordWhere, "keywordWhat: ", keywordWhat);

    // TODO: 페이지 전환. 전환된 페이지에서 API 호출
    /*
      [검색API 쿼리 항목]
      키워드 (장소, 카테고리(기볼만한 곳, 맛집, 숙소), 해시태그)
      정렬기준 (최신순, 인기순, 오래된순)
      가져올 아이템 갯수 (limit) = 16
      몇번째 데이터부터 받을건지 (from)
    */
    navigate(`/search?where=${keywordWhere}&what=${keywordWhat}`);
  };

  useEffect(() => {
    // API 호출
    popularArea()
      .then(({ list }) => {
        setPopularWhere(list);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <>
      <SearchWrapper>
        <div
          className="where-area"
          onFocus={onFocusWhereArea}
          onBlur={onBlurWhereArea}
        >
          <span className="material-icons">pin_drop</span>
          <input
            type="text"
            name="where"
            placeholder="어디에서"
            ref={refWhereInput}
            onChange={onInputWhere}
          />
          {inputWhere ? (
            <ul
              ref={refWhereArea}
              style={{ maxHeight: "500px", overflow: "scroll" }}
            >
              {areaData.areaList
                .filter((area) => {
                  if (inputWhere === "") {
                    return area;
                  } else if (
                    area.toLowerCase().includes(inputWhere.toLowerCase())
                  ) {
                    return area;
                  }
                })
                .map((area) => (
                  <li key={area} onClick={onClickWhereList}>
                    {area}
                  </li>
                ))}
            </ul>
          ) : (
            <ul ref={refWhereArea}>
              <h4>인기 여행지 TOP7</h4>
              {popularWhere.map((item) => (
                <li key={item.id} onClick={onClickWhereList}>
                  {item.areaName}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="what-area">
          <span className="material-icons">sms</span>
          <input
            type="text"
            name="what"
            placeholder="무엇을 하고 싶으세요?"
            ref={refWhatInput}
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
