import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Swal from "sweetalert2";
import {
  GrayButtonStyle,
  CyanButtonStyle,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";
import { addPost } from "../../lib/api/write";
import { useNavigate } from "react-router";
import areaData from "../../lib/json/areaData.json";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import "react-datepicker/dist/react-datepicker.css";

export const SelectCategory = styled.div`
  margin-bottom: 64px;
  .select {
    width: 150px;
    padding: 5px;
    border: 1.4px solid ${palette.cyan[6]};
    border-radius: 4px;
    outline: 0 none;
    color: ${palette.gray[7]};
    font-size: 16px;
    font-family: "Noto Sans KR", sans-serif;
    option {
      background: ${palette.cyan[8]};
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
  margin-bottom: 32px;
  border: 1.5px solid ${palette.gray[3]};
  overflow: scroll;
  > label {
    display: flex;
    justify-cotent: center;
    align-items: center;
    margin-bottom: 16px;
    > span:first-of-type {
      width: 45px;
      color: ${palette.cyan[6]};
    }
    input,
    textarea {
      width: 320px;
      padding: 5px 10px;
      border-radius: 4px;
      background-color: ${palette.gray[1]};
    }
    textarea {
      height: 56.666px;
      border: none;
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
    width: 365px;
    height: 273.75px;
    margin-bottom: 16px;
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
      margin-left: 42.083px;
      margin-top: 2px;
      background-color: ${palette.gray[1]};
      border: 1px solid ${palette.gray[4]};
      border-radius: 4px;
      z-index: 1111;
      h4 {
        padding: 10px 20px;
        font-size: 16px;
        background-color: ${palette.gray[3]};
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
        background-color: ${palette.gray[2]};
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
  .tag {
    color: ${palette.gray[6]};
  }
`;

const CardDatePicker = styled(DatePicker)`
  margin-top: 1.5rem;
  width: 300px;
  height: 42px;
  box-sizing: border-box;
  padding: 8px 20px;
  border-radius: 4px;
  border: 1px solid ${palette.gray[5]}
  font-size: 14px;
`;

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
  background-color: ${palette.cyan[8]};
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
    color: ${palette.cyan[8]};
    span {
      font-size: 12px;
      font-weight: 600;
    }
  }
`;

let timer: NodeJS.Timeout | null = null;

const CreateCard = () => {
  const navigate = useNavigate();

  const refForm = useRef<HTMLDivElement>(null);
  const refInputFile = useRef<HTMLInputElement>(null);

  const refWhereArea = useRef<HTMLUListElement>(null);
  const refWhereInput = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [menu, setMenu] = useState("");
  const [price, setPrice] = useState("");
  const [score, setScore] = useState("");
  const [memo, setMemo] = useState("");
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const [selectedPlace, setSelectedPlace] = useState(false);
  const [selectedRest, setSelectedRest] = useState(false);
  const [selectedAccom, setSelectedAccom] = useState(false);

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
      setSelectedRest(false);
      setSelectedAccom(false);
    }
    if (category === "restaurant") {
      setSelectedPlace(false);
      setSelectedRest(true);
      setSelectedAccom(false);
    }
    if (category === "accommodation") {
      setSelectedPlace(false);
      setSelectedRest(false);
      setSelectedAccom(true);
    }
  }, [category]);

  // 카테고리 선택
  const onSelectedCategory = useCallback((e: any) => {
    if (!refForm.current) return;
    refForm.current.style.display = "block";

    onInit();
    setCategory(e.target.value);
  }, []);

  // 포토카드 이미지 업로드
  const [image, setImage] = useState({
    cardPhotoFile: "",
    cardPhotoUrl: "./images/add-photo.png",
  });
  const cardPhotoChange = (e: any) => {
    e.preventDefault();

    if (!e.target.files.length) return;
    const url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
    setImage({ cardPhotoFile: e.target.files[0].name, cardPhotoUrl: url });
  };
  const cardPhotoDel = () => {
    if (refInputFile.current) refInputFile.current.value = "";
    setImageUrl("");
    setImage({
      cardPhotoFile: "",
      cardPhotoUrl: "./images/add-photo.png",
    });
  };

  // 포스트 위치
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

  const onLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      setLocation(e.target.value);
      console.log("location: ", location);

      // TODO: 지역명 검색 API 호출
    }, 200);
  };

  // 포토카드 태그 업로드
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
        case "restaurant":
          validationItems = [title, location, date, menu, price, score];
          break;
        case "accommodation":
          validationItems = [title, location, date, price, score];
          break;
      }

      if (validationItems.includes("")) {
        Swal.fire("", "필수 항목을 모두 입력해주세요", "warning");
        return;
      }

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
        imageUrl: imageUrl || undefined,
      }).then((res) => {
        if (res) {
          console.log("에러 발생");
          return;
        } else {
          Swal.fire("포토카드 생성 완료!", "", "success");
          navigate("/");
        }
      });
    },
    [
      category,
      date,
      imageUrl,
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
          <option value="restaurant">맛집</option>
          <option value="accommodation">숙소</option>
        </select>
      </SelectCategory>
      <CreateCardBlock>
        <div ref={refForm}>
          <CreateCardStyle>
            <label>
              <img src={image.cardPhotoUrl} alt="PhotocardImage" />
              <div className="cardPhoto-upload">
                <input
                  placeholder={
                    image.cardPhotoFile ? image.cardPhotoFile : "첨부파일"
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
            <label
              className="location"
              onFocus={onFocusWhereArea}
              onBlur={onBlurWhereArea}
            >
              <span>위치*</span>
              <input
                type="text"
                name="location"
                placeholder="ex) 제주, 부산, 속초"
                // value={location}
                ref={refWhereInput}
                onChange={onLocation}
              />
              <ul ref={refWhereArea}>
                {areaData.areaList
                  .filter((area) => {
                    if (location === "") {
                      return area;
                    } else if (
                      area.areaName
                        .toLowerCase()
                        .includes(location.toLowerCase())
                    ) {
                      return area;
                    }
                  })
                  .map((area) => (
                    <li key={area.id} onClick={onClickWhereList}>
                      {area.areaName}
                    </li>
                  ))}
              </ul>
            </label>
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
            {selectedRest ? (
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
            {selectedRest || selectedAccom ? (
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
              <input
                type="number"
                name="score"
                placeholder="ex) 4"
                value={score}
                onChange={(e) => {
                  setScore(e.target.value);
                }}
                className="score"
              />
              <span className="sub">/ 5</span>
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
                      <button onClick={deleteTagItem}>
                        <span className="material-icons">close</span>
                      </button>
                    </TagItem>
                  ))}
                </TagList>
              </div>
            </label>
          </CreateCardStyle>
          <SelectButtonStyle>
            <CyanButtonStyle>
              <button type="submit" onClick={onSubmit}>
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
