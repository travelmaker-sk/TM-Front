import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../styles/palette";

export type ButtonProps = {
  to?: string;
  marginbottom?: string | number;
  fontSize?: string;
  color?: string;
  background?: string;
  hover?: string;
  cyan?: boolean | number;
  gray?: boolean | number;
  fullwidth?: boolean | number;
  onClick?: () => void;
  style?: any;
  children: any;
};

const ButtonStyle = styled.button`
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;

  margin-bottom: ${(props) => props.marginbottom};
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
  &:hover {
    color: ${(props) => props.hover};
  }

  ${(props: ButtonProps) =>
    props.cyan &&
    css`
      color: white;
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

  ${(props: ButtonProps) =>
    props.gray &&
    css`
      color: white;
      background: ${palette.gray[5]};
      &:hover {
        background: ${palette.gray[4]};
      }
    `}

  ${(props: ButtonProps) =>
    props.fullwidth &&
    css`
      width: 100%;
    `}
`;

const StyledButton = styled(ButtonStyle)<ButtonProps>``;

const StyledLink = styled(Link)<ButtonProps>`
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;

  margin-bottom: ${(props) => props.marginbottom};
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
  &:hover {
    color: ${(props) => props.hover};
  }

  ${(props: ButtonProps) =>
    props.cyan &&
    css`
      color: white;
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

  ${(props: ButtonProps) =>
    props.gray &&
    css`
      color: white;
      background: ${palette.gray[5]};
      &:hover {
        background: ${palette.gray[4]};
      }
    `}

${(props: ButtonProps) =>
    props.fullwidth &&
    css`
      width: 100%;
    `}
`;

const Button = (props: ButtonProps) => {
  if (props.to) {
    return (
      <StyledLink
        {...props}
        to={props.to}
        cyan={props.cyan ? 1 : 0}
        gray={props.gray ? 1 : 0}
        fullwidth={props.fullwidth ? 1 : 0}
        marginbottom={props.marginbottom ? 1 : 0}
      />
    );
  }
  return <StyledButton {...props} />;
};

export default Button;
