import { username } from '@goosemod/patcher';
import { React } from '@goosemod/webpack/common';

let before = false;
let unpatch;

const createPatch = () => {
  if (unpatch) unpatch();

  unpatch = username.patch(({ message }) =>
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

    { before }
  );
};

export default { goosemodHandlers: {
  onImport() {
    createPatch();

    goosemodScope.settings.createItem('ID In Author', ['',
      {
        type: 'toggle',
        text: 'Before',
        subtext: 'Add ID before (left) or after (right)',
        onToggle: (c) => {
          before = c;
          createPatch();
        },
        isToggled: () => before
      }
    ])
  },

  onRemove() {
    unpatch();
  },

  getSettings: () => [ before ],
  loadSettings: ([ _before ]) => {
    before = _before ?? false;
  }
}};