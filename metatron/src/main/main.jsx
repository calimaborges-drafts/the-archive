import React from 'react';
import PropTypes from 'prop-types';

import appInfo from '../../package.json';
import { removeAccents } from '../commons/string-helpers';

import { snippetPropType } from '../snippets/snippet-model';

import AddButton from '../snippets/components/add-snippet-button';
import SearchBox from './search-box';
import SnippetItem from '../snippets/components/snippet-item';
import Version from '../commons/version';
import { MenuItem } from './menu';


const filteredSnippets = (snippets, filter) => snippets.filter(snippet => !filter ||
  console.log(removeAccents(snippet.text)) ||
  (snippet.identifier &&
    (removeAccents(snippet.identifier).search(removeAccents(filter)) !== -1)
  ) ||
  (snippet.text && (removeAccents(snippet.text).search(removeAccents(filter)) !== -1)),
);

const Main = ({ snippets, filter }) => {
  let order = 1;
  return (
    <div>
      <MenuItem order={0}><AddButton /></MenuItem>
      <MenuItem order={1}><SearchBox placeholder="Buscar autotexto" /></MenuItem>
      <hr />
      <div className="snippet-container">
        {filteredSnippets(snippets, filter).map((snippet) => {
          order += 1;
          return (
            <MenuItem order={order} key={snippet.identifier}>
              <SnippetItem snippet={snippet} />
            </MenuItem>
          );
        })}
      </div>
      <Version version={appInfo.version} />
    </div>
  );
};

Main.defaultProps = {
  filter: '',
};

Main.propTypes = {
  snippets: PropTypes.arrayOf(snippetPropType).isRequired,
  filter: PropTypes.string,
};

export default Main;
