import styled from "styled-components";
import palette from "../../styles/palette";

const InputStyle = styled.input`
  display: block;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[6]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 30vw;
  margin-bottom: 2rem;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.cyan[5]};
  }
`;

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <InputStyle {...props} />;
};

export default Input;
