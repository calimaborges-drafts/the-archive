import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Welcome from "./Welcome";
import Snippet from "../src/snippets/views/Snippet";
import SnippetList from "../src/snippets/views/SnippetList";
import { SearchInput, ActionButtonGroup, ActionButton } from "../src/commons";

const basicSnippet = index => ({
  title: `Lorem ipsum dolor sit ${index}`,
  body:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam aut quaerat ullam eveniet aperiam impedit accusantium distinctio nostrum tempora reiciendis laboriosam, quasi suscipit accusamus culpa aliquam voluptatem voluptatibus obcaecati illum?"
});

storiesOf("Welcome", module).add("to Storybook", () =>
  <Welcome showApp={linkTo("Button")} />
);

storiesOf("Snippet", module).add("with title and body", () =>
  <Snippet {...basicSnippet(0)} />
);

storiesOf("SnippetList", module)
  .add("empty state", () => <SnippetList snippets={[]} />)
  .add("with 3 Snippets", () =>
    <SnippetList
      snippets={[basicSnippet(0), basicSnippet(1), basicSnippet(2)]}
    />
  );

storiesOf("SearchInput", module)
  .add("empty state", () => <SearchInput />)
  .add("with text", () => <SearchInput query="search term" />)
  .add("with placeholder", () => <SearchInput placeholder="Search term" />);

storiesOf("ActionButton", module).add("with label and onClick", () =>
  <ActionButton onClick={action("clicked")}>Label</ActionButton>
);

storiesOf("ActionButtonGroup", module).add("with 3 buttons", () =>
  <ActionButtonGroup>
    <ActionButton>Label 1</ActionButton>
    <ActionButton>Label 2</ActionButton>
  </ActionButtonGroup>
);
