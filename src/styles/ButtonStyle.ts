import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "./palette";

export const LinkButton = styled(Link)`
  display: block;
  width: 100%;
`;

export const GlobalButtonStyle = styled.div`
  > button {
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

// Auth Button

export const SelectButtonStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  > * {
    width: 100%;
  }
  > *:last-child {
    margin-left: 15px;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    display: block;
    > *:first-child {
      margin-bottom: 13px;
    }
    > *:last-child {
      margin-left: 0;
    }
  }
`;

export const CyanButtonStyle = styled(GlobalButtonStyle)`
  > button {
    width: 100%;
    font-size: 18px;
    color: #fff;
    background: ${palette.cyan[5]};
    &:hover {
      background: ${palette.cyan[4]};
    }
    &:active {
      background: ${palette.cyan[6]};
    }
  }
`;

export const GrayButtonStyle = styled(GlobalButtonStyle)`
  > button {
    width: 100%;
    font-size: 18px;
    color: white;
    background: ${palette.gray[5]};
    &:hover {
      background: ${palette.gray[4]};
    }
    &:active {
      background: ${palette.gray[6]};
    }
  }
`;
