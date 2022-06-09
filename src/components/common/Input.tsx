import styled from "styled-components";
import palette from "../../styles/palette";

const InputStyle = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 26px;
  padding: 0 13px 13px;
  border-bottom: 1px solid ${palette.gray[6]};
  &:focus {
    border-bottom: 1px solid ${palette.cyan[4]};
  }
  font-size: 16px;
`;

const Input = (Type: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <InputStyle {...Type} />;
};

export default Input;
