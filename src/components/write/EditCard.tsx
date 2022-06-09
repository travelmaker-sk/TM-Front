import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  GrayButtonStyle,
  CyanButtonStyle,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";
import { editPost } from "../../lib/api/write";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import {
  CreateCardBlock,
  CreateCardStyle,
  TagInput,
  TagItem,
  TagList,
} from "./CreateCard";
import palette from "../../styles/palette";
import areaData from "../../lib/json/areaData.json";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { NumberLiteralType } from "typescript";
import Loading from "../common/Loading";

export const EditCardBlock = styled(CreateCardBlock)`
  margin-top: 80px;
  > div {
    display: block;
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
  border: 1px solid ${palette.gray[5]};
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

interface EditCardType {
  id: number;
  category: string;
  title: string;
  location: string;
  date: string;
  score: string;
  weather?: string;
  menu?: string;
  price?: string;
  memo?: string;
  tagList?: Array<string>;
  image?: string;
}

let timer: NodeJS.Timeout | null = null;

const EditCard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const postLocation = useLocation();
  const post = postLocation.state as EditCardType;

  const refInputFile = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState(post.category);
  const [title, setTitle] = useState(post.title);
  const [location, setLocation] = useState(post.location);
  const [date, setDate] = useState(post.date);
  const [weather, setWeather] = useState(post.weather ? post.weather : "");
  const [menu, setMenu] = useState(post.menu ? post.menu : "");
  const [price, setPrice] = useState(post.price ? post.price : "");
  const [scoreHover, setScoreHover] = useState(null);
  const [score, setScore] = useState(post.score);
  const [memo, setMemo] = useState(post.memo ? post.memo : "");
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState(post.tagList ? post.tagList : []);

  const [selectedPlace, setSelectedPlace] = useState(false);
  const [selectedStore, setSelectedStore] = useState(false);
  const [selectedLodging, setSelectedLodging] = useState(false);

  const refLocationUl = useRef<HTMLUListElement>(null);
  const refLocation = useRef<HTMLInputElement>(null);

  useEffect(() => {
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

  // 포토카드 이미지 업로드
  const [cardImage, setCardImage] = useState({
    cardImageName: "",
    cardImageUrl: post.image
      ? `./PhotoCard/${post.image}`
      : "./images/add-photo.png",
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

  const onClickLoctionList = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    if (!refLocation.current) return;
    //@ts-ignore
    refLocation.current.value = e.target.innerHTML;

    setLocation(refLocation.current.value);
  };

  const onLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      setLocation(e.target.value);
    }, 200);
  };

  // 포토카드 태그 업로드
  const onKeyPress = (e: any) => {
    e.preventDefault();

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
    e.preventDefault();

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
    setCardImage({
      cardImageName: "",
      cardImageUrl: "./images/add-photo.png",
    });
  };

  // 업로드 버튼
  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setLoading(true);

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
      editPost({
        id: post.id,
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
          navigate("/mypage");
          Swal.fire("포토카드 수정 완료!", "", "success");
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [
      category,
      date,
      location,
      memo,
      menu,
      navigate,
      post.id,
      price,
      score,
      tagList,
      title,
      weather,
    ]
  );

  return (
    <>
      <EditCardBlock>
        <div>
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
              <input
                type="text"
                name="date"
                placeholder="ex) 2022-01-01"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <div>
                {/* @ts-ignore */}
                {/* <CardDatePicker
                  locale={ko}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="📅 달력에서 선택하기"
                  selected={date}
                  onChange={(date: React.SetStateAction<string>) =>
                    setDate(date)
                  }
                /> */}
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
                수정
              </button>
            </CyanButtonStyle>
            <GrayButtonStyle>
              <button onClick={onInit}>초기화</button>
            </GrayButtonStyle>
          </SelectButtonStyle>
        </div>
      </EditCardBlock>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default EditCard;
