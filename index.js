import Plugin from '@goosemod/plugin';

import { username } from '@goosemod/patcher';
import { React } from '@goosemod/webpack/common';


class IDInAuthor extends Plugin {
    onImport() {
      this.enqueueUnpatch(username.patch(({ message }) =>
        React.createElement('span', {
          style: {
            padding: '3px',
            borderRadius: '4px',
            fontSize: '0.8em',
            color: 'var(--text-muted)',
            background: 'var(--background-floating)',
            marginRight: '2px'
          }
        }, message.author.id),
        { before: true }
      ));
    }

    onRemove() { }
};

export default new IDInAuthor();