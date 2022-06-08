import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Swal from "sweetalert2";
import {
  GrayButtonStyle,
  CyanButtonStyle,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";
import { addPost, editPost } from "../../lib/api/write";
import { useNavigate } from "react-router";
import areaData from "../../lib/json/areaData.json";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import "react-datepicker/dist/react-datepicker.css";
import { RootStateOrAny, useSelector } from "react-redux";

export const SelectCategory = styled.div`
  margin-bottom: 80px;
  .select {
    width: 150px;
    padding: 5px;
    border: 1.4px solid ${palette.cyan[5]};
    border-radius: 4px;
    outline: 0 none;
    color: ${palette.gray[7]};
    font-size: 16px;
    font-family: "Noto Sans KR", sans-serif;
    option {
      background: ${palette.cyan[7]};
      color: #fff;
    }
  }
`;

export const CreateCardBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    display: none;
    position: relative;
  }
`;

export const CreateCardStyle = styled.div`
  width: 400px;
  height: 637px;
  padding: 15px;
  margin-bottom: 40px;
  border: 1.5px solid ${palette.gray[3]};
  overflow: scroll;
  > label,
  .location {
    display: flex;
    justify-cotent: center;
    align-items: center;
    margin-bottom: 20px;
    > span:first-of-type {
      width: 45px;
      color: ${palette.cyan[5]};
    }
    input,
    textarea {
      width: 320px;
      padding: 5px 10px;
      border-radius: 4px;
      background-color: ${palette.gray[1]};
      border: 1px solid ${palette.gray[3]};
    }
    textarea {
      height: 58.666px;
      resize: none;
      font-size: 16px;
      font-family: "Noto Sans KR", sans-serif;
    }
    input.price,
    input.score {
      width: 285px;
    }
    > span.sub {
      width: 35px;
      text-align: right;
      color: ${palette.gray[5]};
    }
  }
  img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    margin-bottom: 20px;
  }
  .cardPhoto-upload {
    position: absolute;
    top: -50px;
    left: 9px;
    margin-bottom: 13px;
    display: flex;
    .cardPhoto-name,
    .add-photo,
    .del-photo {
      padding: 5px 15px;
      border-radius: 4px;
    }
    .cardPhoto-name {
      width: 60%;
      border: 1px solid ${palette.gray[4]};
      color: ${palette.gray[4]};
      background-color: white;
    }
    .add-photo,
    .del-photo {
      margin-left: 5px;
      width: 20%;
      // border: 1px solid ${palette.gray[4]};
      cursor: pointer;
      text-align: center;
      line-height: 24px;
      color: white;
    }
    .add-photo {
      background-color: ${palette.cyan[5]};
    }
    .del-photo {
      background-color: ${palette.gray[5]};
    }
    input[type="file"] {
      display: none;
    }
  }
  .location {
    position: relative;
    ul {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      width: 307.25px;
      max-height: 300px;
      overflow: scroll;
      margin-left: 42.083px;
      margin-top: 2px;
      background-color: ${palette.gray[2]};
      border: 1px solid ${palette.gray[4]};
      border-radius: 4px;
      z-index: 1111;
      h4 {
        padding: 10px 20px;
        font-size: 16px;
        background-color: ${palette.gray[8]};
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
  .date {
    input {
      width: 307.25px;
      height: 33.343px;
      margin: 0;
    }
  }
`;

// 날짜
const CardDatePicker = styled(DatePicker)`
  margin-top: 1.5rem;
  width: 300px;
  height: 42px;
  box-sizing: border-box;
  padding: 8px 20px;
  border-radius: 4px;
  // border: 1px solid ${palette.gray[5]};
`;

// 평점
const ReviewBox = styled.div`
  padding: 0 7px;
  span {
    margin: 0 3px;
    font-size: 28px;
    opacity: 0.07;
    cursor: pointer;
  }
  .yellowStar {
    color: orange;
    opacity: 1;
  }
`;

const StarContainer = styled.div`
  text-align: center;
  border: none;
  background-color: white;
`;

// 태그
export const TagInput = styled.input`
  margin-bottom: 5px;
  width: 307px !important;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 5px 5px 0;
  padding: 5px;
  background-color: ${palette.cyan[7]};
  border-radius: 5px;
  color: white;
  font-size: 14px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    height: 15px;
    margin-left: 5px;
    background-color: white;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 700;
    color: ${palette.cyan[7]};
  }
`;

let timer: NodeJS.Timeout | null = null;

const CreateCard = () => {
  const navigate = useNavigate();

  const refForm = useRef<HTMLDivElement>(null);
  const refInputFile = useRef<HTMLInputElement>(null);

  const refLocationUl = useRef<HTMLUListElement>(null);
  const refLocation = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [menu, setMenu] = useState("");
  const [price, setPrice] = useState("");
  const [scoreHover, setScoreHover] = useState(null);
  const [score, setScore] = useState("");
  const [memo, setMemo] = useState("");
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

  const [selectedPlace, setSelectedPlace] = useState(false);
  const [selectedStore, setSelectedStore] = useState(false);
  const [selectedLodging, setSelectedLodging] = useState(false);

  useEffect(() => {
    console.log("category", category);
    console.log("title", title);
    console.log("location", location);
    console.log("date", date);
    console.log("weather", weather);
    console.log("menu", menu);
    console.log("price", price);
    console.log("score", score);
    console.log("memo", memo);
    console.log("tagList", tagList);
  }, [
    category,
    date,
    location,
    memo,
    menu,
    price,
    score,
    tagList,
    title,
    weather,
  ]);

  // 카테고리 선택
  useEffect(() => {
    if (category === "") {
      Swal.fire(
        "카테고리를 먼저 선택해주세요",
        "카테고리를 선택하면 포토카드 생성 화면이 나옵니다 ☺️",
        "info"
      );
    }
    if (category === "place") {
      setSelectedPlace(true);
      setSelectedStore(false);
      setSelectedLodging(false);
    }
    if (category === "store") {
      setSelectedPlace(false);
      setSelectedStore(true);
      setSelectedLodging(false);
    }
    if (category === "lodging") {
      setSelectedPlace(false);
      setSelectedStore(false);
      setSelectedLodging(true);
    }
  }, [category]);

  const onSelectedCategory = useCallback((e: any) => {
    if (!refForm.current) return;
    refForm.current.style.display = "block";

    onInit();
    setCategory(e.target.value);
  }, []);

  // 사진
  const [cardImage, setCardImage] = useState({
    cardImageName: "",
    cardImageUrl: "./images/add-photo.png",
  });
  const cardPhotoChange = (e: any) => {
    e.preventDefault();

    if (!e.target.files.length) return;
    const url = URL.createObjectURL(e.target.files[0]);
    setCardImage({ cardImageName: e.target.files[0].name, cardImageUrl: url });
  };
  const cardPhotoDel = () => {
    if (refInputFile.current) refInputFile.current.value = "";
    setCardImage({
      cardImageName: "",
      cardImageUrl: "./images/add-photo.png",
    });
  };

  // 위치
  const onFocusLocation = () => {
    if (!refLocationUl.current) return;
    refLocationUl.current.style.display = "block";
  };
  const onBlurLocation = () => {
    setTimeout(() => {
      if (!refLocationUl.current) return;
      refLocationUl.current.style.display = "none";
    }, 130);
  };

  const onClickLoctionList = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      if (!refLocation.current) return;
      //@ts-ignore
      refLocation.current.value = e.target.innerHTML;

      setLocation(refLocation.current.value);

      console.log(
        "input:",
        refLocation.current.value,
        "list:",
        //@ts-ignore
        e.target.innerHTML
      );
    },
    []
  );

  const onLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      setLocation(e.target.value);
      console.log("location: ", location);
    }, 200);
  };

  // 태그
  const onKeyPress = (e: any) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };
  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    // @ts-ignore
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem("");
  };
  const deleteTagItem = (e: any) => {
    console.log("delete tag");
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  // 초기화 버튼
  const onInit = () => {
    setTitle("");
    setLocation("");
    setDate("");
    setWeather("");
    setMenu("");
    setPrice("");
    setScore("");
    setMemo("");
    setTagList([]);
  };

  // 업로드 버튼
  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const numberPrice = Number(price);
      const numberScore = Number(score);

      let validationItems: string[] = [];
      switch (category) {
        case "place":
          validationItems = [title, location, date, score];
          break;
        case "store":
          validationItems = [title, location, date, menu, price, score];
          break;
        case "lodging":
          validationItems = [title, location, date, price, score];
          break;
      }

      if (validationItems.includes("")) {
        Swal.fire("", "필수 항목을 모두 입력해주세요", "warning");
        return;
      }

      const file = refInputFile.current?.files?.[0];

      // API 호출
      addPost({
        category,
        title,
        location,
        date,
        score: numberScore,
        weather: weather || undefined,
        menu: menu || undefined,
        price: numberPrice || undefined,
        memo: memo || undefined,
        tagList: tagList.length ? tagList : undefined,
        image: file || undefined,
      })
        .then((res) => {
          navigate("/");
          Swal.fire("포토카드 생성 완료!", "", "success");
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    [
      category,
      date,
      location,
      memo,
      menu,
      navigate,
      price,
      score,
      tagList,
      title,
      weather,
    ]
  );

  return (
    <>
      <SelectCategory>
        <select
          name="category"
          className="select"
          onChange={onSelectedCategory}
          defaultValue="default"
        >
          <option value="default" disabled>
            카테고리 선택
          </option>
          <option value="place">가볼 만한 곳</option>
          <option value="store">맛집</option>
          <option value="lodging">숙소</option>
        </select>
      </SelectCategory>
      <CreateCardBlock>
        <div ref={refForm}>
          <CreateCardStyle>
            <label>
              <img src={cardImage.cardImageUrl} alt="PhotocardImage" />
              <div className="cardPhoto-upload">
                <input
                  placeholder={
                    cardImage.cardImageName
                      ? cardImage.cardImageName
                      : "첨부파일"
                  }
                  className="cardPhoto-name"
                  readOnly
                />
                <label htmlFor="cardPhoto" className="add-photo">
                  선택
                </label>
                <input
                  type="file"
                  id="cardPhoto"
                  accept="image/*"
                  onChange={cardPhotoChange}
                  ref={refInputFile}
                />
                <button onClick={cardPhotoDel} className="del-photo">
                  삭제
                </button>
              </div>
            </label>
            <label>
              <span>제목*</span>
              <input
                type="text"
                name="title"
                placeholder="ex) 성산일출봉, 제주식당, 제주호텔"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </label>
            <div
              className="location"
              onFocus={onFocusLocation}
              onBlur={onBlurLocation}
            >
              <span>위치*</span>
              <input
                type="text"
                name="location"
                placeholder="ex) 제주, 부산, 속초"
                defaultValue={location}
                ref={refLocation}
                onChange={onLocation}
              />
              <ul ref={refLocationUl}>
                {areaData.areaList
                  .filter((area) => {
                    if (location === "") {
                      return area;
                    } else if (
                      area.toLowerCase().includes(location.toLowerCase())
                    ) {
                      return area;
                    }
                  })
                  .map((area) => (
                    <li key={area} onClick={onClickLoctionList}>
                      {area}
                    </li>
                  ))}
              </ul>
            </div>
            <label className="date">
              <span>날짜*</span>
              <div>
                {/* @ts-ignore */}
                <CardDatePicker
                  locale={ko}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="📅 달력에서 선택하기"
                  selected={date}
                  onChange={(date: React.SetStateAction<string>) =>
                    setDate(date)
                  }
                />
              </div>
            </label>
            {selectedPlace ? (
              <label>
                <span>날씨*</span>
                <input
                  type="text"
                  name="weather"
                  placeholder="ex) 맑음, 흐림"
                  value={weather}
                  onChange={(e) => {
                    setWeather(e.target.value);
                  }}
                />
              </label>
            ) : (
              ""
            )}
            {selectedStore ? (
              <label>
                <span>메뉴*</span>
                <input
                  type="text"
                  name="menu"
                  placeholder="ex) 갈치구이"
                  value={menu}
                  onChange={(e) => {
                    setMenu(e.target.value);
                  }}
                />
              </label>
            ) : (
              ""
            )}
            {selectedStore || selectedLodging ? (
              <label>
                <span>가격*</span>
                <input
                  type="number"
                  name="price"
                  placeholder="ex) 25000"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  className="price"
                />
                <span className="sub">원</span>
              </label>
            ) : (
              ""
            )}
            <label>
              <span>평점*</span>
              <ReviewBox>
                <StarContainer>
                  {[1, 2, 3, 4, 5].map((el) => (
                    <span
                      className={`material-icons ${
                        // @ts-ignore
                        (score >= el) | (scoreHover >= el) && "yellowStar"
                      }`}
                      key={el}
                      // @ts-ignore
                      onMouseEnter={() => setScoreHover(el)}
                      onMouseLeave={() => setScoreHover(null)}
                      // @ts-ignore
                      onClick={() => setScore(el)}
                    >
                      grade
                    </span>
                  ))}
                </StarContainer>
              </ReviewBox>
            </label>
            <label>
              <span>메모</span>
              <textarea
                name="memo"
                maxLength={30}
                placeholder="최대 30자"
                value={memo}
                onChange={(e) => {
                  setMemo(e.target.value);
                }}
              />
            </label>
            <label className="tag">
              <span>태그</span>
              <div>
                <TagInput
                  type="text"
                  name="tag"
                  placeholder="태그를 입력하고 엔터키를 눌러주세요!"
                  value={tagItem}
                  onChange={(e) => setTagItem(e.target.value)}
                  onKeyPress={onKeyPress}
                />
                <TagList>
                  {tagList.map((tagItem, index) => (
                    <TagItem key={index}>
                      <span>{tagItem}</span>
                      <button
                        className="material-icons"
                        onClick={deleteTagItem}
                      >
                        close
                      </button>
                    </TagItem>
                  ))}
                </TagList>
              </div>
            </label>
          </CreateCardStyle>
          <SelectButtonStyle>
            <CyanButtonStyle>
              <button type="button" onClick={onSubmit}>
                업로드
              </button>
            </CyanButtonStyle>
            <GrayButtonStyle>
              <button onClick={onInit}>초기화</button>
            </GrayButtonStyle>
          </SelectButtonStyle>
        </div>
      </CreateCardBlock>
    </>
  );
};

export default CreateCard;
