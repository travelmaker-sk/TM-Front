import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../styles/palette";

export type ButtonProps = {
  to?: string;
  marginBottom?: string;
  fontSize?: string;
  color?: string;
  background?: string;
  cyan?: boolean | number;
  gray?: boolean | number;
  fullwidth?: boolean | number;
  hover?: boolean | number;
  onClick?: () => void;
  style?: any;
  children: any;
};

const ButtonStyle = styled.button`
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;

  margin-bottom: ${(props) => props.marginBottom};
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};

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

${(props: ButtonProps) =>
    props.hover &&
    css`
      &:hover {
        color: ${palette.gray[6]};
      }
    `}
`;

const StyledButton = styled(ButtonStyle)<ButtonProps>``;

const StyledLink = styled(Link)<ButtonProps>`
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;

  margin-bottom: ${(props) => props.marginBottom};
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};

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

${(props: ButtonProps) =>
    props.hover &&
    css`
      &:hover {
        color: ${palette.gray[6]};
      }
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
        hover={props.hover ? 1 : 0}
        fullwidth={props.fullwidth ? 1 : 0}
      />
    );
  }
  return <StyledButton {...props} />;
};

export default Button;
