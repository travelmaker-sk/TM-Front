import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { Wrapper } from "../../pages/HomePage";
import { HeaderBottomPlus } from "../../pages/MyPage";
import palette from "../../styles/palette";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Swal from "sweetalert2";
import {
  GrayButtonStyle,
  CyanButtonStyle,
  LinkButton,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";
import { addPost } from "../../lib/api/write";
import { useNavigate } from "react-router";

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

const CreateCardBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    display: none;
    position: relative;
  }
`;

const CreateCardStyle = styled.div`
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
    input {
      width: 320px;
      padding: 5px 10px;
      border-radius: 4px;
      background-color: ${palette.gray[1]};
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
  .tag {
    color: ${palette.gray[6]};
  }
`;

const TagInput = styled.input`
  margin-bottom: 5px;
  width: 307px !important;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TagItem = styled.div`
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

const CreateCard = () => {
  // useEffect(() => {
  //   Swal.fire(
  //     "카테고리를 먼저 선택해주세요",
  //     "카테고리를 선택하면 포토카드 생성 화면이 나옵니다 ☺️",
  //     "info"
  //   );
  // }, []);

  const navigate = useNavigate();

  const refForm = useRef<HTMLDivElement>(null);

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
  console.log("price ", price);
  console.log("tagList", tagList);

  const [selectedPlace, setSelectedPlace] = useState(false);
  const [selectedRest, setSelectedRest] = useState(false);
  const [selectedAccom, setSelectedAccom] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  console.log("selectedCategory ", selectedCategory);
  console.log("category ", category);

  // 카테고리 선택
  const onSelectedCategory = useCallback(
    (e: any) => {
      if (!refForm.current) return;
      refForm.current.style.display = "block";

      setSelectedCategory(e.target.value);

      if (selectedCategory === "") {
        Swal.fire(
          "카테고리를 먼저 선택해주세요",
          "카테고리를 선택하면 포토카드 생성 화면이 나옵니다 ☺️",
          "info"
        );
      }
      if (selectedCategory === "place") {
        setSelectedPlace(true);
        setSelectedRest(false);
        setSelectedAccom(false);

        setCategory("place");
      }
      if (selectedCategory === "restaurant") {
        setSelectedPlace(false);
        setSelectedRest(true);
        setSelectedAccom(false);

        setCategory("restaurant");
      }
      if (selectedCategory === "accommodation") {
        setSelectedPlace(false);
        setSelectedRest(false);
        setSelectedAccom(true);

        setCategory("accommodation");
      }
    },
    [selectedCategory]
  );

  // 포토카드 이미지 업로드
  const [image, setImage] = useState({
    cardPhotoFile: "",
    cardPhotoUrl: "./images/add-photo.png",
  });
  const cardPhotoChange = (e: any) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        cardPhotoFile: e.target.files[0].name,
        //@ts-ignore
        cardPhotoUrl: fileReader.result,
      });
    };
  };
  const cardPhotoDel = () => {
    setImage({
      cardPhotoFile: "",
      cardPhotoUrl: "./images/add-photo.png",
    });
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

      if ([category, title, location, date, score].includes("")) {
        Swal.fire("", "필수 항목을 모두 입력해주세요", "warning");
        return;
      }

      // API 호출
      addPost(
        category,
        title,
        location,
        date,
        score,
        weather,
        menu,
        price,
        memo,
        tagList,
        imageUrl
      ).then((res) => {
        if (res) {
          alert("에러 발생");
        } else {
          alert("성공");
          // navigate("/");
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
      price,
      score,
      tagList,
      title,
      weather,
    ]
  );

  return (
    <Wrapper>
      <Header />
      <HeaderBottomPlus />
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
              <img src={image.cardPhotoUrl} alt="Photo" />
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
            <label>
              <span>위치*</span>
              <input
                type="text"
                name="location"
                placeholder="ex) 제주, 부산, 속초"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </label>
            <label>
              <span>날짜*</span>
              <input
                type="text"
                name="date"
                placeholder="ex) 2022-01-01"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
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
                  type="text"
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
                type="text"
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
              <input
                type="textarea"
                name="memo"
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
                <LinkButton to="/">업로드</LinkButton>
              </button>
            </CyanButtonStyle>
            <GrayButtonStyle>
              <button onClick={onInit}>초기화</button>
            </GrayButtonStyle>
          </SelectButtonStyle>
        </div>
      </CreateCardBlock>
      <Footer />
    </Wrapper>
  );
};

export default CreateCard;
