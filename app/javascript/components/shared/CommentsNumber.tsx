import * as React from 'react';

import I18n from 'i18n-js';

interface Props {
  number: number;
}

const CommentsNumber = ({ number }: Props) => (
  <span className="badge badgeLight">{`${number} `}{ I18n.t('javascript.components.shared.comments_number.comments')}</span>
);

export default CommentsNumber;