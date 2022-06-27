## TableSoup ES Module

An abstract ES6 js class for expanding a piece of functionality in HTML table elements.

### Import

```js
import { TableSoup } from 'TableSoup';
```

## Syntax
`parameters` required*
TableSoup contructor accepts an HTML table element

```js
const table = document.querySelector('table');
```
## Initialize
```js
new TableSoup(table);
```
## Example
`initialize multiple table instances`

```js
function getTables() {
	return Array.from(document.querySelectorAll('.arp-table')).map((table) => new TableSoup(table));
}

let myTables = getTables();
```