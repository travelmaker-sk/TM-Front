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
  margin-bottom: 32px;
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

const CreateCardStyle = styled(CardStyle)`
  width: 400px;
  height: 637px;
  font-size: 16px;
  cursor: auto;
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    width: 400px;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    width: 400px;
  }
`;

const CreateCard = () => {
  // Swal.fire(
  //   "카테고리를 먼저 선택해주세요",
  //   "카테고리를 선택하면 포토카드 생성 화면이 나옵니다 ☺️",
  //   "info"
  // );

  const refForm = useRef<HTMLFormElement>(null);

  const [selectedPlace, setSelectedPlace] = useState(false);
  const [selectedRest, setSelectedRest] = useState(false);
  const [selectedAccom, setSelectedAccom] = useState(false);

  const [selected, setSelected] = useState("");

  const onSelected = useCallback(
    (e: any) => {
      e.preventDefault();

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
            <li>
              <img src="" alt="" />
            </li>
            <li>
              <span>이름</span>
            </li>
            <li>
              <span>위치</span>
            </li>
            <li>
              <span>날짜</span>
            </li>
            {selectedPlace ? (
              <li>
                <span>날씨</span>
              </li>
            ) : (
              ""
            )}
            {selectedRest ? (
              <li>
                <span>메뉴</span>
              </li>
            ) : (
              ""
            )}
            {selectedRest || selectedAccom ? (
              <li>
                <span>가격</span>
              </li>
            ) : (
              ""
            )}
            <li>
              <span>평점</span>
            </li>
            <li>
              <span>메모</span>
            </li>
            <li className="tag"></li>
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
