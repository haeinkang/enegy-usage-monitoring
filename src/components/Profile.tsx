import styled from "styled-components";

interface ProfileProps {
  size: number;
  style?: React.CSSProperties; // 인라인 스타일 적용
  children?: React.ReactNode; // 추가 컨텐츠
}

const Profile = (props: ProfileProps): JSX.Element => (
  <Circle size={props.size} style={props.style}>
    {props.children}
  </Circle>
);

export default Profile;

const Circle = styled.div<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  overflow: hidden;
  boder: solid 1px var(--joy-palette-neutral-500);
  img {
    width: 100%;
  }
`;
