import { useTranslation } from "react-i18next";
function Trans({word}) {
  const { t } = useTranslation();

  return t(word)    
}

export default Trans;