# Quiborgue Pad

Quiborgue Pad is a very simple web text editing and sharing tool.

# Pre-Requisites

* Node.js
* NPM
* Bower

# Running

```
$ git clone git@github.com:quiborgue/quiborgue-pad.git
$ cd quiborgue-pad
$ npm install 
$ cd public && bower install && cd ..
$ node app.js
```

# Running in Production
Use PM2 (https://github.com/unitech/pm2) or forever (https://github.com/nodejitsu/forever)

# Keymap

```
Alt-Left               goSubwordLeft
Alt-Right              goSubwordRight
Ctrl-Up                scrollLineUp
Ctrl-Down              scrollLineDown
Shift-Ctrl-L           splitSelectionByLine
Shift-Tab              indentLess
Esc                    singleSelectionTop
Ctrl-L                 selectLine
Shift-Ctrl-K           deleteLine
Ctrl-Enter             insertLineAfter
Shift-Ctrl-Enter       insertLineBefore
Ctrl-D                 selectNextOccurrence
Shift-Ctrl-Space       selectScope
Shift-Ctrl-M           selectBetweenBrackets
Ctrl-M                 goToBracket
Shift-Ctrl-Up          swapLineUp
Shift-Ctrl-Down        swapLineDown
Ctrl-/                 toggleComment
Ctrl-J                 joinLines
Shift-Ctrl-D           duplicateLine
Ctrl-T                 transposeChars
F9                     sortLines
Ctrl-F9                sortLinesInsensitive
F2                     nextBookmark
Shift-F2               prevBookmark
Ctrl-F2                toggleBookmark
Shift-Ctrl-F2          clearBookmarks
Alt-F2                 selectBookmarks
Alt-Q                  wrapLines
Shift-Alt-Up           selectLinesUpward
Shift-Alt-Down         selectLinesDownward
Ctrl-F3                findUnder
Shift-Ctrl-F3          findUnderPrevious
Shift-Ctrl-[           fold
Shift-Ctrl-]           unfold
Ctrl-H                 replace
Ctrl-K Ctrl-Backspace  delLineLeft
Ctrl-K Ctrl-K          delLineRight
Ctrl-K Ctrl-U          upcaseAtCursor
Ctrl-K Ctrl-L          downcaseAtCursor
Ctrl-K Ctrl-Space      setSublimeMark
Ctrl-K Ctrl-A          selectToSublimeMark
Ctrl-K Ctrl-W          deleteToSublimeMark
Ctrl-K Ctrl-X          swapWithSublimeMark
Ctrl-K Ctrl-Y          sublimeYank
Ctrl-K Ctrl-G          clearBookmarks
Ctrl-K Ctrl-C          showInCenter
Ctrl-K Ctrl-j          unfoldAll
Ctrl-K Ctrl-0          unfoldAll
```
