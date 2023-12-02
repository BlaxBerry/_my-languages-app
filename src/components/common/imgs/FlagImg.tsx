import { memo, useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import LanguageIcon from "@mui/icons-material/Language";
import type { Language } from "@/types/client";
import { LanguageToCountry } from "@/utils/helpers";
import { getAssetsURL } from "@/utils/tools";
import type { SxProps } from "@mui/material/styles";

function FlagImg(props: { language: Language; sx?: SxProps }) {
  const getSVGURI = useCallback((lang: Language): string => {
    const countryName = LanguageToCountry(lang);
    return getAssetsURL(`svgs/flags/${countryName}.svg`);
  }, []);

  return (
    <Avatar src={getSVGURI(props.language)} sx={{ ...props.sx }}>
      <LanguageIcon />
    </Avatar>
  );
}

const FlagImgMemo = memo(FlagImg);
export default FlagImgMemo;
