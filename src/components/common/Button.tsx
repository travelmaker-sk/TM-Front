import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../styles/palette";

type TCommonButtonProps = {
  fullWidth: boolean;
  cyan?: boolean;
  to: string;
};

const buttonStyle = css`
  border: 1px solid ${palette.gray[6]};
  border-radius: 1px;
  font-size: 1rem;
  padding: 0.3rem 0.8rem;
  outline: none;
  cursor: pointer;
  background: white;
  color: ${palette.gray[6]};
  &:hover {
    color: ${palette.gray[5]};
  }
  ${(props: TCommonButtonProps) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  ${(props) =>
    props.cyan &&
    css`
      border: none;
      background: ${palette.cyan[5]};
      color: white;
      &:hover {
        background: ${palette.cyan[4]};
        color: white;
      }
    `}
`;

const StyledButton = styled.button<TCommonButtonProps>`
  ${buttonStyle}
`;

const StyledLink = styled(Link)<TCommonButtonProps>`
  ${buttonStyle}
`;

const Button = (props: TCommonButtonProps) => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
