import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// 매번 컴포넌트에서 useDispatch와 useSelector를
// 사용할 때마다 타입을 지정하는 대신,
// 미리 타입이 지정된 버전을 만들어
// 일반적인 useDispatch와 useSelector 대신 아래와 같이 사용
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
