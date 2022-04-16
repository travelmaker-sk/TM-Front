import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../styles/palette";

type ButtonProps = {
  to?: string;
  cyan?: boolean | number;
  fullWitdh?: boolean;
  onClick?: () => void;
  children: string;
};

const ButtonStyle = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  outline: none;
  cursor: pointer;

  color: white;
  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
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
    props.fullWitdh &&
    css`
      width: 100%;
    `}
`;

const StyledButton = styled.button<ButtonProps>`
  ${ButtonStyle}
`;

const StyledLink = styled(Link)<ButtonProps>`
  ${ButtonStyle}
`;

const Button = (props: ButtonProps) => {
  if (props.to) {
    return <StyledLink {...props} to={props.to} cyan={props.cyan ? 1 : 0} />;
  }
  return <StyledButton {...props} />;
};

export default Button;
