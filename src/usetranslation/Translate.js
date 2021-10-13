import React from 'react';
import { Trans, useTranslation } from 'react-i18next'

export default function Translate(word) {
  const { t } = useTranslation(word);

  return <Trans t={t}/>;
}
