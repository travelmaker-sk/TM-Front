import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { Wrapper } from "../../pages/HomePage";
import { HeaderBottomPlus } from "../../pages/MyPage";
import palette from "../../styles/palette";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Swal from "sweetalert2";
import { CardStyle } from "../photocard/Card";
import {
  GrayButtonStyle,
  CyanButtonStyle,
  LinkButton,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";

export const SelectCategory = styled.div`
  margin-bottom: 64px;
  .select {
    width: 180px;
    padding: 7px 10px;
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
  form {
    display: none;
  }
`;

const CreateCardStyle = styled.div`
  position: relative;
  width: 400px;
  height: 637px;
  padding: 16px;
  margin-bottom: 32px;
  border: 1.5px solid ${palette.gray[3]};
  > label {
    display: flex;
    line-height: 1.2em;
    margin-bottom: 16px;
    span {
      width: 40px;
      color: ${palette.cyan[6]};
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
    margin-top: 32.333px;
    color: ${palette.gray[6]};
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

  const refForm = useRef<HTMLFormElement>(null);

  const [selectedPlace, setSelectedPlace] = useState(false);
  const [selectedRest, setSelectedRest] = useState(false);
  const [selectedAccom, setSelectedAccom] = useState(false);

  const [selected, setSelected] = useState("");

  const onSelected = useCallback(
    (e: any) => {
      if (!refForm.current) return;
      refForm.current.style.display = "block";

      setSelected(e.target.value);

      if (selected === "place") {
        setSelectedPlace(true);
        setSelectedRest(false);
        setSelectedAccom(false);
      }
      if (selected === "restaurant") {
        setSelectedPlace(false);
        setSelectedRest(true);
        setSelectedAccom(false);
      }
      if (selected === "accommodation") {
        setSelectedPlace(false);
        setSelectedRest(false);
        setSelectedAccom(true);
      }
    },
    [selected]
  );
  console.log("selected: ", selected);

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

  return (
    <Wrapper>
      <Header />
      <HeaderBottomPlus />
      <SelectCategory>
        <select
          name="fruits"
          className="select"
          value={"default"}
          onChange={onSelected}
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
        <form ref={refForm}>
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
              <span>이름</span>
            </label>
            <label>
              <span>위치</span>
            </label>
            <label>
              <span>날짜</span>
            </label>
            {selectedPlace ? (
              <label>
                <span>날씨</span>
              </label>
            ) : (
              ""
            )}
            {selectedRest ? (
              <label>
                <span>메뉴</span>
              </label>
            ) : (
              ""
            )}
            {selectedRest || selectedAccom ? (
              <label>
                <span>가격</span>
              </label>
            ) : (
              ""
            )}
            <label>
              <span>평점</span>
            </label>
            <label>
              <span>메모</span>
            </label>
            <label className="tag"></label>
          </CreateCardStyle>
          <SelectButtonStyle>
            <CyanButtonStyle>
              <button type="submit">
                <LinkButton to="/">업로드</LinkButton>
              </button>
            </CyanButtonStyle>
            <GrayButtonStyle>
              <button>초기화</button>
            </GrayButtonStyle>
          </SelectButtonStyle>
        </form>
      </CreateCardBlock>
      <Footer />
    </Wrapper>
  );
};

export default CreateCard;
