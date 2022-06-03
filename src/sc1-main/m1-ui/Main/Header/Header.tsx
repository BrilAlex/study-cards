import {useEffect, useState} from "react";
import {HeaderMobile} from "./HeaderMobile";
import {HeaderBigScreen} from "./HeaderBigScreen";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false)

  window.addEventListener('resize', () => {
    if (window.innerWidth < 800) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  })

  useEffect(() => {
    if (window.innerWidth < 800) {
      setIsMobile(true)
    } else setIsMobile(false)
  }, [])

  return (<>
      {isMobile
        ? <HeaderMobile/>
        : <HeaderBigScreen/>
      }
    </>
  )
}
