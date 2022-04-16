import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../styles/palette";

export type ButtonProps = {
  to?: string;
  color?: string;
  background?: string;
  hover?: string;
  marginBottom?: string;
  cyan?: boolean | number;
  fullWidth?: boolean;
  onClick?: () => void;
  children: any;
};

const ButtonStyle = styled.button`
  width: 100%;
  padding: 10px 0;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;

  color: ${(props) => props.color || "#FFF"};
  background: ${(props) => props.background || `${palette.gray[8]}`};
  &:hover {
    background: ${(props) => props.hover};
  }
  margin-bottom: ${(props) => props.marginBottom};

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
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const StyledButton = styled(ButtonStyle)<ButtonProps>``;

const StyledLink = styled(Link)<ButtonProps>`
  width: 100%;
  padding: 8px 10px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;

  color: ${(props) => props.color || "#FFF"};
  background: ${(props) => props.background || `${palette.gray[8]}`};

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
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const Button = (props: ButtonProps) => {
  if (props.to) {
    return <StyledLink {...props} to={props.to} cyan={props.cyan ? 1 : 0} />;
  }
  return <StyledButton {...props} />;
};

export default Button;
