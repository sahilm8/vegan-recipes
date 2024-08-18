import { useDispatch, useSelector } from "react-redux"
import { setUrls } from "../state/searchSlice"

export const useSaveReqUrl = () => {
  const dispatch = useDispatch()
  const urls = useSelector((state: any) => state.search.urls)

  const saveUrl = (url: string) => {
    if (!urls.includes(url)) {
      dispatch(setUrls([...urls, url]))
    } else {
      dispatch(setUrls(urls.filter((u: string) => u !== url)))
    }
  }

  return [saveUrl]
}
