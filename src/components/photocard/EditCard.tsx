import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { Wrapper } from "../../pages/HomePage";
import { HeaderBottomPlus } from "../../pages/MyPage";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Swal from "sweetalert2";
import {
  GrayButtonStyle,
  CyanButtonStyle,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";
import { addPost, editPost } from "../../lib/api/write";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import {
  CreateCardBlock,
  CreateCardStyle,
  TagInput,
  TagItem,
  TagList,
} from "./CreateCard";

export const EditCardBlock = styled(CreateCardBlock)`
  margin-top: 64px;
  > div {
    display: block;
  }
`;

const EditCard = () => {
  const navigate = useNavigate();

  const postLocation = useLocation();
  const post = postLocation.state;

  const refInputFile = useRef<HTMLInputElement>(null);

  // @ts-ignore
  const [id, setId] = useState(post.id);
  // @ts-ignore
  const [category, setCategory] = useState(post.category);
  // @ts-ignore
  const [title, setTitle] = useState(post.title);
  // @ts-ignore
  const [location, setLocation] = useState(post.location);
  // @ts-ignore
  const [date, setDate] = useState(post.date);
  // @ts-ignore
  const [weather, setWeather] = useState(post.weather);
  // @ts-ignore
  const [menu, setMenu] = useState(post.menu);
  // @ts-ignore
  const [price, setPrice] = useState(post.price);
  // @ts-ignore
  const [score, setScore] = useState(post.score);
  // @ts-ignore
  const [memo, setMemo] = useState(post.memo);
  const [tagItem, setTagItem] = useState("");
  // @ts-ignore
  const [tagList, setTagList] = useState(post.tagList);
  // @ts-ignore
  const [imageUrl, setImageUrl] = useState(post.imageUrl);

  const [selectedPlace, setSelectedPlace] = useState(false);
  const [selectedRest, setSelectedRest] = useState(false);
  const [selectedAccom, setSelectedAccom] = useState(false);

  useEffect(() => {
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
      // @ts-ignore
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
      editPost({
        id,
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
          Swal.fire("포토카드 수정 완료!", "", "success");
          navigate("/mypage");
        }
      });
    },
    [
      category,
      date,
      id,
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
    <Wrapper>
      <Header />
      <HeaderBottomPlus />
      <EditCardBlock>
        <div>
          <CreateCardStyle>
            <label>
              <img src={image.cardPhotoUrl} alt="PhotocardImage" />
              <div className="cardPhoto-upload">
                <input
                  placeholder={image.cardPhotoFile ?? "첨부파일"}
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
                  {/* @ts-ignore */}
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
                수정
              </button>
            </CyanButtonStyle>
            <GrayButtonStyle>
              <button onClick={onInit}>초기화</button>
            </GrayButtonStyle>
          </SelectButtonStyle>
        </div>
      </EditCardBlock>
      <Footer />
    </Wrapper>
  );
};

export default EditCard;
