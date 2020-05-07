import { useSelector } from "react-redux";
import { InitialState } from "../store/reducers/MainReducer";

export const urlDataBase = "https://localhost:44381/api/";
export const urlHub= "https://localhost:44381/"
export const siteUrl = "https//localhost:3000/"


interface StateProps {
    tokenIdRdx: string;
  }

export const tokenId = () => {
    const { tokenIdRdx } = useSelector<InitialState, StateProps>(
        (state: InitialState) => {
          return {
            tokenIdRdx: state.tokenIdRdx,
          };
        },
      );
    return tokenIdRdx;
}