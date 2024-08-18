import { useDispatch } from "react-redux"
import { setUrls } from "../state/searchSlice"

export const usePagination = async () => {
  const dispatch = useDispatch()

  const saveUrl = async (url: string) => {
    dispatch(setUrls(url))
  }

  return [saveUrl]
}
